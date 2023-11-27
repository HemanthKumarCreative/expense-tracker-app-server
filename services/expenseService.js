const Expense = require("../database/models/expenseModel");
const { formatMongoData, checkObjectId } = require("../helpers/dbHelper");
const constants = require("../constants/index");

module.exports.createExpense = async (serviceData) => {
  try {
    let expense = new Expense({ ...serviceData });
    let result = await expense.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createExpense", error);
    throw new Error(error);
  }
};

module.exports.getAllExpenses = async ({ page }, userId) => {
  try {
    const totalCount = await Expense.countDocuments({ userId }); // Count total expenses
    const pageSize = 3;
    const offset = (page - 1) * pageSize;

    let expenses = await Expense.find({ userId })
      .skip(parseInt(offset))
      .limit(parseInt(pageSize));
    console.log({ expenses });

    const totalPages = Math.ceil(totalCount / parseInt(pageSize)); // Calculate total pages

    return {
      expenses: formatMongoData(expenses),
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.log("Something went wrong: Service: getAllExpenses", error);
    throw new Error(error);
  }
};

module.exports.getExpenseById = async ({ id }) => {
  try {
    checkObjectId(id);
    let expense = await Expense.findById(id);
    if (!expense) {
      throw new Error(constants.expenseMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(expense);
  } catch (error) {
    console.log("Something went wrong: Service: getExpenseById", error);
    throw new Error(error);
  }
};

module.exports.updateExpense = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let expense = await Expense.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!expense) {
      throw new Error(constants.expenseMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(expense);
  } catch (error) {
    console.log("Something went wrong: Service: updateExpense", error);
    throw new Error(error);
  }
};

module.exports.deleteExpense = async ({ id }) => {
  try {
    checkObjectId(id);
    let expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      throw new Error(constants.expenseMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(expense);
  } catch (error) {
    console.log("Something went wrong: Service: deleteExpense", error);
    throw new Error(error);
  }
};
