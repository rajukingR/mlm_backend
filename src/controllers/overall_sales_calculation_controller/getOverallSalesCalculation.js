const { Order, Product, OrderItem, User, SalesStockTarget } = require('../../../models');
const { Op } = require('sequelize');
const { sequelize } = require('../../../models');

exports.getOverallSalesCalculation = async (req, res) => {
  try {
    const USER_ROLE_NAME = req.user.role_name; 
    const Distributor_ROLE_ID = req.user.id;  

    //** Check if the role is 'Customer' and restrict access **//
    if (USER_ROLE_NAME === 'Customer') {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this information.',
      });
    }

    const roles = ['Area Development Officer', 'Master Distributor', 'Super Distributor', 'Distributor', 'Customer'];
    const result = [];

    //** Admin role: predefined hierarchy logic **//
    if (USER_ROLE_NAME === 'Admin') {
      for (const role of roles) {
        // Fetch users by role
        const users = await User.findAll({
          where: { role_name: role },
        });

        const totalUsers = users.length;

        // Fetch role-specific sales and stock targets
        const roleTarget = await SalesStockTarget.findOne({
          where: { role_name: role },
        });

        const targetAmount = parseFloat(roleTarget?.target || 0) * totalUsers;
        const targetStock = parseFloat(roleTarget?.stock_target || 0) * totalUsers;

        //** Fetch accepted orders for users in this role **//
        const orders = await Order.findAll({
          where: {
            higher_role_id: users.map((user) => user.id),
            status: 'Accepted',
          },
          include: [
            {
              model: OrderItem,
              as: 'OrderItems',
              include: {
                model: Product,
                as: 'product',
                required: true,
              },
            },
          ],
        });

        //** Calculate achieved sales amount and stock **//
        let totalSalesAmount = 0;
        let totalStockAchieved = 0;

        for (const order of orders) {
          for (const orderItem of order.OrderItems) {
            const product = orderItem.product;
            let price = 0;

            //** Determine price based on role **//
            switch (role) {
              case 'Area Development Officer':
                price = product.adoPrice || 0;
                break;
              case 'Master Distributor':
                price = product.mdPrice || 0;
                break;
              case 'Super Distributor':
                price = product.sdPrice || 0;
                break;
              case 'Distributor':
                price = product.distributorPrice || 0;
                break;
            }

            totalSalesAmount += price * (parseInt(orderItem.quantity) || 0);
            totalStockAchieved += parseInt(orderItem.quantity) || 0;
          }
        }

        //** Calculate pending amounts and percentages **//
        const pendingAmount = Math.max(targetAmount - totalSalesAmount, 0);
        const pendingStock = Math.max(targetStock - totalStockAchieved, 0);

        const salesAchievementPercent = Math.min(
          Math.max(targetAmount > 0 ? (totalSalesAmount / targetAmount) * 100 : 0, 0),
          100
        );
        const stockAchievementPercent = Math.min(
          Math.max(targetStock > 0 ? (totalStockAchieved / targetStock) * 100 : 0, 0),
          100
        );

                //** Calculate total amount ordered by 'Customer' users **//
                const customerOrders = await Order.findAll({
                  where: {
                    user_id: users.filter((user) => user.role_name === 'Customer').map((user) => user.id),
                    status: 'Accepted',
                  },
                });

            const customerBuyedAmmount = customerOrders.reduce((total, order) => total + parseFloat(order.final_amount || 0), 0);

        const roleData = {
          roleName: role,
          totalUsers,
          targetAmount,
          targetStock,
          totalSalesAmount,
          totalStockAchieved,
          pendingAmount,
          pendingStock,
          salesAchievementPercent: salesAchievementPercent.toFixed(2),
          stockAchievementPercent: stockAchievementPercent.toFixed(2),
        };
  
        if (role === 'Customer') {
          roleData.customerBuyedAmmount = customerBuyedAmmount;
        }
  
        result.push(roleData);

      }

      return res.status(200).json({
        success: true,
        result,
      });
    }

    //***** Non-admin roles: Fetch only data directly under the user's ID *****//
    let directRoles = roles.filter((role) => role !== USER_ROLE_NAME && role !== 'Admin');

    //** Exclude specific roles based on the logged-in user's role **//
    if (USER_ROLE_NAME === 'Super Distributor') {
      directRoles = directRoles.filter(role => role !== 'Area Development Officer' && role !== 'Master Distributor' && role !== 'Super Distributor');
    } else if (USER_ROLE_NAME === 'Distributor') {
      directRoles = directRoles.filter(role => role !== 'Area Development Officer' && role !== 'Master Distributor' && role !== 'Super Distributor' && role !== 'Distributor');
    } else if (USER_ROLE_NAME === 'Master Distributor') {
      //** Exclude 'Area Development Officer' if logged in as 'Master Distributor' **//
      directRoles = directRoles.filter(role => role !== 'Area Development Officer');
    }

    for (const role of directRoles) {
      const users = await User.findAll({
        where: { superior_id: Distributor_ROLE_ID, role_name: role },
      });

      const totalUsers = users.length;

      //** Fetch role-specific sales and stock targets **//
      const roleTarget = await SalesStockTarget.findOne({
        where: { role_name: role },
      });

      const targetAmount = parseFloat(roleTarget?.target || 0) * totalUsers;
      const targetStock = parseFloat(roleTarget?.stock_target || 0) * totalUsers;

      //** Fetch accepted orders for users directly under this role **//
      const orders = await Order.findAll({
        where: {
          user_id: users.map((user) => user.id),
          status: 'Accepted',
        },
        include: [
          {
            model: OrderItem,
            as: 'OrderItems',
            include: {
              model: Product,
              as: 'product',
              required: true,
            },
          },
        ],
      });

      let totalSalesAmount = 0;
      let totalStockAchieved = 0;

      for (const order of orders) {
        for (const orderItem of order.OrderItems) {
          const product = orderItem.product;
          let price = 0;

          //** Determine price based on role **//
          switch (role) {
            case 'Area Development Officer':
              price = product.adoPrice || 0;
              break;
            case 'Master Distributor':
              price = product.mdPrice || 0;
              break;
            case 'Super Distributor':
              price = product.sdPrice || 0;
              break;
            case 'Distributor':
              price = product.distributorPrice || 0;
              break;
          }

          totalSalesAmount += price * (parseInt(orderItem.quantity) || 0);
          totalStockAchieved += parseInt(orderItem.quantity) || 0;
        }
      }

      const pendingAmount = Math.max(targetAmount - totalSalesAmount, 0);
      const pendingStock = Math.max(targetStock - totalStockAchieved, 0);

      const salesAchievementPercent = Math.min(
        Math.max(targetAmount > 0 ? (totalSalesAmount / targetAmount) * 100 : 0, 0),
        100
      );
      const stockAchievementPercent = Math.min(
        Math.max(targetStock > 0 ? (totalStockAchieved / targetStock) * 100 : 0, 0),
        100
      );

        //** Calculate total amount ordered by 'Customer' users for direct roles **//
        const customerOrdersDirect = await Order.findAll({
          where: {
            user_id: users.filter((user) => user.role_name === 'Customer').map((user) => user.id),
            status: 'Accepted',
          },
        });
  
        const customerBuyedAmmountDirect = customerOrdersDirect.reduce((total, order) => total + parseFloat(order.final_amount || 0), 0);

      const roleData = {
        roleName: role,
        totalUsers,
        targetAmount,
        targetStock,
        totalSalesAmount,
        totalStockAchieved,
        pendingAmount,
        pendingStock,
        salesAchievementPercent: salesAchievementPercent.toFixed(2),
        stockAchievementPercent: stockAchievementPercent.toFixed(2),
        customerBuyedAmmount: role === 'Customer' ? customerBuyedAmmountDirect : undefined,
      };

      result.push(roleData);

    }

    return res.status(200).json({
      success: true,
      result,
    });


  } catch (error) {
    console.error('Error calculating overall sales:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate overall sales',
      error: error.message,
    });
  }
};









// const { Order, Product, OrderItem, User, SalesStockTarget } = require('../../../models');
// const { Op } = require('sequelize');
// const { sequelize } = require('../../../models');

// exports.getOverallSalesCalculation = async (req, res) => {
//   try {
//     const USER_ROLE_NAME = req.user.role_name; // Logged-in user's role
//     const Distributor_ROLE_ID = req.user.id;  // Logged-in Distributor's ID

//     // Check if the role is 'Customer' and restrict access
//     if (USER_ROLE_NAME === 'Customer') {
//       return res.status(403).json({
//         success: false,
//         message: 'You do not have access to this information.',
//       });
//     }

//     const roles = ['Area Development Officer', 'Master Distributor', 'Super Distributor', 'Distributor', 'Customer'];
//     const result = [];

//     // Distributor-specific logic
//     if (USER_ROLE_NAME === 'Distributor') {
//       // Fetch customers directly under the Distributor
//       const customers = await User.findAll({
//         where: { superior_id: Distributor_ROLE_ID, role_name: 'Customer' },
//       });

//       const totalUsers = customers.length;

//       // Fetch accepted orders for customers under this Distributor
//       const orders = await Order.findAll({
//         where: {
//           user_id: customers.map((customer) => customer.id),
//           status: 'Accepted',
//         },
//         include: [
//           {
//             model: OrderItem,
//             as: 'OrderItems',
//             include: {
//               model: Product,
//               as: 'product',
//               required: true,
//             },
//           },
//         ],
//       });

//       // Calculate total buy amount and stock
//       let totalBuyedAmount = 0;
//       let totalStockBuyed = 0;

//       for (const order of orders) {
//         for (const orderItem of order.OrderItems) {
//           totalBuyedAmount += (orderItem.product?.price || 0) * (parseInt(orderItem.quantity) || 0);
//           totalStockBuyed += parseInt(orderItem.quantity) || 0;
//         }
//       }

//       // Push the result for the Distributor's customer stats
//       result.push({
//         roleName: 'Customer',
//         totalUsers,
//         totalBuyedAmount,
//         totalStockBuyed,
//       });

//       return res.status(200).json({
//         success: true,
//         result,
//       });
//     }

//     // Filtering roles based on user role
//     const filteredRoles = roles.filter((role) => {
//       if (USER_ROLE_NAME === 'Admin') return true; // Admin sees all roles
//       if (USER_ROLE_NAME === 'Area Development Officer' && role !== 'Area Development Officer') return true;
//       if (USER_ROLE_NAME === 'Master Distributor' && !['Area Development Officer', 'Master Distributor'].includes(role)) return true;
//       if (USER_ROLE_NAME === 'Super Distributor' && !['Area Development Officer', 'Master Distributor', 'Super Distributor'].includes(role)) return true;
//       return false; // Exclude all other roles
//     });

//     for (const role of filteredRoles) {
//       // Fetch users by role
//       const users = await User.findAll({
//         where: { role_name: role },
//       });

//       const totalUsers = users.length;

//       // Fetch role-specific sales and stock targets
//       const roleTarget = await SalesStockTarget.findOne({
//         where: { role_name: role },
//       });

//       const targetAmount = parseFloat(roleTarget?.target || 0) * totalUsers;
//       const targetStock = parseFloat(roleTarget?.stock_target || 0) * totalUsers;

//       // Fetch accepted orders for users in this role
//       const orders = await Order.findAll({
//         where: {
//           higher_role_id: users.map((user) => user.id),
//           status: 'Accepted',
//         },
//         include: [
//           {
//             model: OrderItem,
//             as: 'OrderItems',
//             include: {
//               model: Product,
//               as: 'product',
//               required: true,
//             },
//           },
//         ],
//       });

//       // Calculate achieved sales amount and stock
//       let totalSalesAmount = 0;
//       let totalStockAchieved = 0;

//       for (const order of orders) {
//         for (const orderItem of order.OrderItems) {
//           const product = orderItem.product;
//           let price = 0;

//           // Determine price based on role
//           switch (role) {
//             case 'Area Development Officer':
//               price = product.adoPrice || 0;
//               break;
//             case 'Master Distributor':
//               price = product.mdPrice || 0;
//               break;
//             case 'Super Distributor':
//               price = product.sdPrice || 0;
//               break;
//             case 'Distributor':
//               price = product.distributorPrice || 0;
//               break;
//           }

//           totalSalesAmount += price * (parseInt(orderItem.quantity) || 0);
//           totalStockAchieved += parseInt(orderItem.quantity) || 0;
//         }
//       }

//       // Calculate pending amounts and percentages
//       const pendingAmount = Math.max(targetAmount - totalSalesAmount, 0);
//       const pendingStock = Math.max(targetStock - totalStockAchieved, 0);

//       const salesAchievementPercent = Math.min(
//         Math.max(targetAmount > 0 ? (totalSalesAmount / targetAmount) * 100 : 0, 0),
//         100
//       );
//       const stockAchievementPercent = Math.min(
//         Math.max(targetStock > 0 ? (totalStockAchieved / targetStock) * 100 : 0, 0),
//         100
//       );

//       result.push({
//         roleName: role,
//         totalUsers,
//         targetAmount,
//         targetStock,
//         totalSalesAmount,
//         totalStockAchieved,
//         pendingAmount,
//         pendingStock,
//         salesAchievementPercent: salesAchievementPercent.toFixed(2),
//         stockAchievementPercent: stockAchievementPercent.toFixed(2),
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       result,
//     });
//   } catch (error) {
//     console.error('Error calculating overall sales:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to calculate overall sales',
//       error: error.message,
//     });
//   }
// };





//////////*******Most selleing Product API********////////////

const moment = require('moment'); 


exports.getMostSellingProductPercentage = async (req, res) => {
  const USER_ID = req.user.id;
  const USER_ROLE = req.user.role_name;

  const { month } = req.body; // Accept month from the request body

  try {
    if (!month) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a month.',
      });
    }

    // Get the start and end date for the provided month
    const startOfMonth = moment(month, 'YYYY-MM').startOf('month').toDate();
    const endOfMonth = moment(month, 'YYYY-MM').endOf('month').toDate();

    // Set conditions based on the role of the user
    const orderConditions = {
      status: 'Accepted',
      created_at: { [Op.between]: [startOfMonth, endOfMonth] },
    };

    if (USER_ROLE === 'Admin') {
      // If Admin, filter orders where higher_role_id is 1
      orderConditions.higher_role_id = 1;
    } else {
      // Otherwise, filter orders specific to the logged-in user
      orderConditions.higher_role_id = USER_ID;
    }

    // Fetch all accepted orders based on conditions
    const orders = await Order.findAll({
      where: orderConditions,
      include: [
        {
          model: OrderItem,
          as: 'OrderItems',
          include: {
            model: Product,
            as: 'product',
            required: true,
          },
        },
      ],
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: 'No orders found for the selected month' });
    }

    // Step 1: Calculate total sales for the selected month
    let totalSales = 0;
    let productSales = {}; // Object to store sales by product

    // Iterate over orders and calculate product-wise sales
    for (const order of orders) {
      for (const orderItem of order.OrderItems) {
        const product = orderItem.product;
        const quantity = parseInt(orderItem.quantity) || 0;
        const price = product.price || 0; // Assuming product price field is present

        const salesAmount = quantity * price;
        totalSales += salesAmount;

        if (product.id in productSales) {
          productSales[product.id].sales += salesAmount;
          productSales[product.id].quantity += quantity;
        } else {
          productSales[product.id] = {
            productName: product.name,
            sales: salesAmount,
            quantity: quantity,
          };
        }
      }
    }

    // Step 2: Calculate percentage for each product
    const productPercentages = Object.keys(productSales).map(productId => {
      const product = productSales[productId];
      const productPercentage = (product.sales / totalSales) * 100;
      return {
        productName: product.productName,
        sales: product.sales,
        percentage: productPercentage.toFixed(2),
      };
    });

    // Step 3: Sort products by percentage in descending order
    productPercentages.sort((a, b) => b.percentage - a.percentage);

    return res.status(200).json({
      success: true,
      mostSellingProducts: productPercentages,
    });
  } catch (error) {
    console.error('Error fetching most selling product percentage:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch product percentage',
      error: error.message,
    });
  }
};



// exports.getMostSellingProductPercentage = async (req, res) => { 
//   const USER_ID = req.user.id;

//   try {
//     // Get the start and end date for the current month
//     const startOfMonth = moment().startOf('month').toDate();
//     const endOfMonth = moment().endOf('month').toDate();

//     // Fetch all accepted orders for the current month made by the user
//     const orders = await Order.findAll({
//       where: {
//         higher_role_id: USER_ID,  // Assuming the 'higher_role_id' is the ID of the user
//         status: 'Accepted',
//         created_at: { [Op.between]: [startOfMonth, endOfMonth] },
//       },
//       include: [
//         {
//           model: OrderItem,
//           as: 'OrderItems',
//           include: {
//             model: Product,
//             as: 'product',
//             required: true,
//           },
//         },
//       ],
//     });

//     if (!orders || orders.length === 0) {
//       return res.status(404).json({ success: false, message: 'No orders found for the current month' });
//     }

//     // Step 1: Calculate total sales for the current month
//     let totalSales = 0;
//     let productSales = {}; // object to store sales by product

//     // Iterate over orders and calculate product-wise sales
//     for (const order of orders) {
//       for (const orderItem of order.OrderItems) {
//         const product = orderItem.product;
//         const quantity = parseInt(orderItem.quantity) || 0;
//         const price = product.price || 0; // assuming product price field is present

//         const salesAmount = quantity * price;
//         totalSales += salesAmount;

//         if (product.id in productSales) {
//           productSales[product.id].sales += salesAmount;
//           productSales[product.id].quantity += quantity;
//         } else {
//           productSales[product.id] = {
//             productName: product.name,
//             sales: salesAmount,
//             quantity: quantity,
//           };
//         }
//       }
//     }

//     // Step 2: Calculate percentage for each product
//     const productPercentages = Object.keys(productSales).map(productId => {
//       const product = productSales[productId];
//       const productPercentage = (product.sales / totalSales) * 100;
//       return {
//         productName: product.productName,
//         sales: product.sales,
//         percentage: productPercentage.toFixed(2),
//       };
//     });

//     // Step 3: Sort products by percentage in descending order
//     productPercentages.sort((a, b) => b.percentage - a.percentage);

//     return res.status(200).json({
//       success: true,
//       mostSellingProducts: productPercentages,
//     });
//   } catch (error) {
//     console.error('Error fetching most selling product percentage:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to fetch product percentage',
//       error: error.message,
//     });
//   }
// };


/////////////***********Get Sales Trent************//////////





exports.salesOverTime = async (req, res) => {

  // exports.getProductSalesQuantityByMonths = async (req, res) => {
    const { role_name: USER_ROLE_NAME, id: USER_ID } = req.user;
    const { startMonth, endMonth } = req.body;
  
    try {
      if (!startMonth || !endMonth) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide both startMonth and endMonth in the request body.' 
        });
      }
  
      // Parse the input months to get start and end dates
      const startDate = new Date(`${startMonth}-01`);
      const endDate = new Date(`${endMonth}-01`);
      endDate.setMonth(endDate.getMonth() + 1); // Include the entire end month
  
      if (startDate > endDate) {
        return res.status(400).json({
          success: false,
          message: 'Invalid date range. Start month must be earlier than or equal to end month.',
        });
      }
  
      const whereCondition = {
        created_at: { [Op.between]: [startDate, endDate] },
        status: 'Accepted',
      };
  
      // Add user filter if not admin
      if (USER_ROLE_NAME !== 'Admin') {
        whereCondition.higher_role_id = USER_ID;
      }
  
      // Fetch orders within the specified range
      const orders = await Order.findAll({
        where: whereCondition,
        include: [
          {
            model: OrderItem,
            as: 'OrderItems',
            include: {
              model: Product,
              as: 'product',
              required: true,
            },
          },
        ],
      });
  
      // Calculate product quantity sold
      const productSales = {};
      orders.forEach((order) => {
        order.OrderItems.forEach((orderItem) => {
          const productName = orderItem.product.name;
          productSales[productName] = (productSales[productName] || 0) + (orderItem.quantity || 0);
        });
      });
  
      // Prepare response
      const result = Object.entries(productSales).map(([productName, quantity]) => ({
        productName,
        quantity,
      }));
  
      return res.status(200).json({
        success: true,
        result,
        message: `Product sales quantity from ${startMonth} to ${endMonth}.`,
      });
    } catch (error) {
      console.error('Error fetching product sales quantity:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch product sales quantity',
        error: error.message,
      });
    }
  };


  //////////*****Bar Graph, total stock&selled stock detail*******//////////


  
  exports.getStockTargetDetails = async (req, res) => {
    try {
      const { role_name: USER_ROLE_NAME, id: USER_ID } = req.user; // Logged-in user's role and ID
  
      // Get the current date and the last 6 months
      const currentDate = new Date();
      const months = [];
      for (let i = 0; i < 6; i++) {
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() - i);
        months.push(date.toISOString().slice(0, 7)); // Format as YYYY-MM
      }
  
      let result = [];
  
      if (USER_ROLE_NAME === 'Admin') {
        // Admin: Calculate total ADO stock target and sold stock for each of the last 6 months
        const adoUsers = await User.findAll({
          where: { role_name: 'Area Development Officer' },
        });
  
        const totalAdoStockTarget = await SalesStockTarget.findOne({
          where: { role_name: 'Area Development Officer' },
        });
  
        const totalTargetStock = adoUsers.length * (totalAdoStockTarget?.stock_target || 0);
  
        // For each month, calculate total sold stock for ADOs
        for (const month of months) {
          const adoIds = adoUsers.map((user) => user.id);
          const adoOrders = await Order.findAll({
            where: {
              user_id: adoIds,
              status: 'Accepted',
              createdAt: {
                [Op.gte]: new Date(`${month}-01`), // Start of the month
                [Op.lt]: new Date(new Date(`${month}-01`).setMonth(new Date(`${month}-01`).getMonth() + 1)), // End of the month
              },
            },
            include: [
              {
                model: OrderItem,
                as: 'OrderItems',
              },
            ],
          });
  
          let totalSoldStock = 0;
          for (const order of adoOrders) {
            for (const orderItem of order.OrderItems) {
              totalSoldStock += parseInt(orderItem.quantity) || 0;
            }
          }
  
          result.push({
            month,
            totalTargetStock,
            totalSoldStock,
          });
        }
  
      } else {
        // Non-Admin Roles: Fetch user-specific stock target and sold stock for each of the last 6 months
        const userTarget = await SalesStockTarget.findOne({
          where: { role_name: USER_ROLE_NAME },
        });
  
        const totalTargetStock = userTarget?.stock_target || 0;
  
        // For each month, fetch sold stock for this user
        for (const month of months) {
          const userOrders = await Order.findAll({
            where: {
              user_id: USER_ID,
              status: 'Accepted',
              createdAt: {
                [Op.gte]: new Date(`${month}-01`), // Start of the month
                [Op.lt]: new Date(new Date(`${month}-01`).setMonth(new Date(`${month}-01`).getMonth() + 1)), // End of the month
              },
            },
            include: [
              {
                model: OrderItem,
                as: 'OrderItems',
              },
            ],
          });
  
          let totalSoldStock = 0;
          for (const order of userOrders) {
            for (const orderItem of order.OrderItems) {
              totalSoldStock += parseInt(orderItem.quantity) || 0;
            }
          }
  
          result.push({
            month,
            totalTargetStock,
            totalSoldStock,
          });
        }
      }
  
      return res.status(200).json({
        success: true,
        result,
      });
    } catch (error) {
      console.error('Error fetching stock target details:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch stock target details',
        error: error.message,
      });
    }
  };
  