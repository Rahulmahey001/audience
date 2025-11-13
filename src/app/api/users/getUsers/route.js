import { NextResponse } from 'next/server';
import dbConnect from '@/lib/DBconnection';
import { User as NormalUser } from '@/models/normalUser';
import User from '@/models/googleEmailUsers';

// App Router endpoint must export named handlers (GET, POST, etc.).
export async function GET(request) {
  try {
    // Connect to database
    await dbConnect();

    // Parse query parameters from the request URL
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const search = searchParams.get('search') || '';
    const authMethod = searchParams.get('authMethod');
    const role = searchParams.get('role');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build search filter
    let searchFilter = {};
    if (search) {
      searchFilter = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      };
    }

    // Build auth method filter
    let authMethodFilter = {};
    if (authMethod) {
      authMethodFilter = { authMethod };
    }

    // Build role filter for Google users
    let roleFilter = {};
    if (role) {
      roleFilter = { role };
    }

    try {
      // Fetch users from both models in parallel
      const [normalUsers, googleUsers] = await Promise.all([
        NormalUser.find({
          ...searchFilter,
          ...authMethodFilter
        })
          .select('name email age authMethod createdAt')
          .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
          .skip(skip)
          .limit(limitNum)
          .lean(),

        User.find({
          ...searchFilter,
          ...roleFilter
        })
          .select('name email role createdAt')
          .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
          .skip(skip)
          .limit(limitNum)
          .lean()
      ]);

      // Get total counts for pagination
      const [totalNormalUsers, totalGoogleUsers] = await Promise.all([
        NormalUser.countDocuments({
          ...searchFilter,
          ...authMethodFilter
        }),
        User.countDocuments({
          ...searchFilter,
          ...roleFilter
        })
      ]);

      // Transform the data to consistent format
      const transformedNormalUsers = normalUsers.map(user => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        age: user.age || null,
        authMethod: user.authMethod,
        userType: 'normal',
        createdAt: user.createdAt,
        role: null // Normal users don't have role
      }));

      const transformedGoogleUsers = googleUsers.map(user => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        age: null, // Google users don't have age
        authMethod: 'google',
        userType: 'google',
        createdAt: user.createdAt,
        role: user.role
      }));

      // Combine both user types
      const allUsers = [...transformedNormalUsers, ...transformedGoogleUsers];

      // Sort combined results if needed
      allUsers.sort((a, b) => {
        if (sortOrder === 'desc') {
          return new Date(b[sortBy]) - new Date(a[sortBy]);
        } else {
          return new Date(a[sortBy]) - new Date(b[sortBy]);
        }
      });

      // Calculate pagination info
      const totalUsers = totalNormalUsers + totalGoogleUsers;
      const totalPages = Math.ceil(totalUsers / limitNum);

      return NextResponse.json({
        success: true,
        data: {
          users: allUsers,
          pagination: {
            currentPage: pageNum,
            totalPages,
            totalUsers,
            hasNext: pageNum < totalPages,
            hasPrev: pageNum > 1
          },
          summary: {
            normalUsers: totalNormalUsers,
            googleUsers: totalGoogleUsers,
            totalUsers
          }
        }
      }, { status: 200 });

    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({
        success: false,
        message: 'Error fetching users from database'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}