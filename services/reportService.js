const Report = require("../database/models/reportModel");
const { formatMongoData, checkObjectId } = require("../helpers/dbHelper");
const constants = require("../constants/index");
const Expense = require("../database/models/expenseModel");
const AWS = require("aws-sdk");
const Excel = require("exceljs");

const saveToWorkBook = (jsonData, workbook, worksheet) => {
  const headerRow = worksheet.addRow(Object.keys(jsonData[0]["_doc"]));
  worksheet.addRow(headerRow);

  jsonData.forEach((row) => {
    console.log(row);
    const dataRow = Object.values(row["_doc"]);
    worksheet.addRow(dataRow);
  });

  return new Promise((resolve, reject) => {
    workbook.xlsx
      .writeFile("report.xlsx")
      .then(() => {
        resolve(workbook);
      })
      .catch((error) => {
        reject("Error generating Excel report:", error);
      });
  });
};

module.exports.createReport = async (userId) => {
  const emptyWorkbook = new Excel.Workbook();
  const worksheet = emptyWorkbook.addWorksheet("Expenses");

  try {
    let expenses = await Expense.find({ userId });

    const workbook = await saveToWorkBook(expenses, emptyWorkbook, worksheet);
    const awsResponse = await workbook.xlsx.writeBuffer().then((buffer) => {
      const params = {
        Bucket: "expensetracker250923",
        Key: `expense_report${userId}${new Date().toLocaleTimeString()}.xlsx`,
        Body: buffer,
        ContentType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ACL: "public-read",
      };
      let s3 = new AWS.S3({
        accessKeyId: process.env.AWS_IAM_USER_KEY,
        secretAccessKey: process.env.AWS_IAM_USER_SECRET,
      });

      return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
          if (err) {
            reject("Error uploading to S3:", err);
          } else {
            resolve({ report_url: data.Location });
          }
        });
      });
    });
    return awsResponse;
  } catch (error) {
    console.error(error);
  }
};

module.exports.getAllReports = async ({ skip = 0, limit = 10 }) => {
  try {
    let reports = await Report.find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    return formatMongoData(reports);
  } catch (error) {
    console.log("Something went wrong: Service: getAllReports", error);
    throw new Error(error);
  }
};

module.exports.getReportById = async ({ id }) => {
  try {
    checkObjectId(id);
    let report = await Report.findById(id);
    if (!report) {
      throw new Error(constants.reportMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(report);
  } catch (error) {
    console.log("Something went wrong: Service: getReportById", error);
    throw new Error(error);
  }
};

module.exports.updateReport = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let report = await Report.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!report) {
      throw new Error(constants.reportMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(report);
  } catch (error) {
    console.log("Something went wrong: Service: updateReport", error);
    throw new Error(error);
  }
};

module.exports.deleteReport = async ({ id }) => {
  try {
    checkObjectId(id);
    let report = await Report.findByIdAndDelete(id);
    if (!report) {
      throw new Error(constants.reportMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(report);
  } catch (error) {
    console.log("Something went wrong: Service: deleteReport", error);
    throw new Error(error);
  }
};
