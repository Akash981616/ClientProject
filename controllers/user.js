const officegen = require("officegen");
var PptxGenJS = require("pptxgenjs");
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const FormModel = require("../models/form");
const ImageModel = require("../models/images");
const AppError = require("../utils/appError");
const { validationResult } = require("express-validator");
const { upload } = require("../utils/upload");
const sizeOf = require("image-size");
const path = require("path");

const saveFile = async (form_id) => {
  try {
    const form = await FormModel.findById(form_id);

    if (!form) return;

    const image = await ImageModel.find({
      form,
    });

    let { shop_name, address, phone_no, gst, name } = form;

    var pptx = new PptxGenJS();
    let slide = pptx.addSlide();

    slide.background = { path: "./assets/header.png" };
    image.forEach((e, i) => {
      const { path, width, height, quantity, requirment_type } = e;

      slide = pptx.addSlide();
      slide.background = { path: "./assets/background.png" };

      // Basic way to add text string:

      slide.addText(shop_name?.trim(), {
        fontSize: 18,
        fontFace: "Times New Roman",
        align: "left",
        color: "ffffff",
        x: "1%",
        y: "4.3%",
        w: "50%",
      });
      slide.addText(address?.trim(), {
        fontSize: 18,
        fontFace: "Times New Roman",
        align: "left",
        color: "ffffff",
        x: "1%",
        y: "9%",
        w: "60%",
      });

      slide.addText(`GST NO`, {
        fontSize: 16,
        fontFace: "Times New Roman",
        align: "left",
        color: "ffffff",
        x: "50%",
        w: "50%",
        y: "4%",
      });

      slide.addText(`:${gst?.trim()}`, {
        fontSize: 16,
        fontFace: "Times New Roman",
        align: "left",
        color: "ffffff",
        x: "65%",
        y: "3%",
        w: "35%",
      });

      slide.addText(`PH No`, {
        fontSize: 24,
        fontFace: "Times New Roman",
        align: "left",
        color: "ffffff",
        x: "50%",
        y: "11.9%",
        w: "50%",
      });
      slide.addText(`:${phone_no?.trim()}`, {
        fontSize: 40,
        fontFace: "Times New Roman",
        align: "right",
        color: "ffffff",
        x: "61%",
        y: "10.8%",
        w: "35%",
      });

      const dimensions = sizeOf(path);
      console.log(dimensions);

      slide.addImage({
        path,
        x: "3%",
        y: dimensions.height > dimensions.width ? "17%" : "25%",
        w: dimensions.height > dimensions.width ? "23%" : "60%",
        h: dimensions.width > dimensions.height ? "40%" : "68%",
      });

      slide.addText(
        `${requirment_type[i]?.trim() ? requirment_type.trim() + " -" : ""} ${
          width.trim() ? "W-" + width.trim() + '" X' : ""
        } ${height.trim() ? " H-" + height.trim() + '"' : '"'} ${
          quantity.trim() ? "- " + quantity.trim() + "Qty" : ""
        }`,
        {
          fontSize: 14,
          fontFace: "Times New Roman",
          align: "left",
          color: "ffffff",
          x: "3%",
          y: "95%",
          w: "50%",
        }
      );
      slide.addText(`${name?.trim() || ""}`, {
        fontSize: 14,
        fontFace: "Times New Roman",
        align: "right",
        color: "ffffff",
        x: "35%",
        w: "50%",
        y: "95%",
      });
    });

    const footerSlide = pptx.addSlide();
    footerSlide.background = { path: "./assets/footer.png" };

    const ppt_path = path.join("uploads", "ppt_files", `${form.id}.pptx`);
    pptx.writeFile({ fileName: ppt_path });

    await FormModel.findByIdAndUpdate(form_id, {
      ppt_path,
    });

    // pptx
    //   .stream()
    //   .then((data) => {
    //     res.writeHead(200, {
    //       "Content-disposition": "attachment;filename=test.pptx",
    //       "Content-Length": data.length,
    //     });
    //     res.end(data);
    //   })
    //   .catch((err) => {
    //     return next(new AppError(err, 401));
    //   });
  } catch (err) {
    return next(new AppError(err, 401));
  }
};

exports.download = catchAsync(async (req, res, next) => {
  if (req.user.role != "admin") {
    return next(new AppError("Not Found", 401));
  }
  const { form_id } = req.params;
  const form = await FormModel.findById(form_id);
  const path = "./" + form.ppt_path;
  res.download(path);
});
exports.regenerate = catchAsync(async (req, res, next) => {
  saveFile("63e4c4348e2d38b7c3ac7268");
  res.send("regenerated");
});

exports.saveForm = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError("Validation Error", 422, errors.array()));
  }
  // validate
  let {
    shop_name,
    address,
    phone_no,
    gst,
    name,
    width,
    height,
    quantity,
    requirment_type,
  } = req.body;

  let arr = req?.files?.uploadedFile;

  if (!arr) {
    return next(new AppError("File is required", 401));
  }

  if (req.files.uploadedFile.constructor != Array) {
    arr = [req.files.uploadedFile];
    width = [width];
    height = [height];
    quantity = [quantity];
    requirment_type = [requirment_type];
  }

  const form = await FormModel.create({
    shop_name,
    address,
    phone_no,
    gst,
    name,
    user: req.user,
  });

  for (let i = 0; i < arr.length; ++i) {
    const path = await upload(arr[i]);
    await ImageModel.create({
      form,
      address: address[i],
      width: width[i],
      height: height[i],
      quantity: quantity[i],
      requirment_type: requirment_type[i],
      path,
    });
  }
  saveFile(form.id);
  return res.status(201).json({
    status: "Success",
    message: "Form Saved.",
  });
});

exports.getAllForm = catchAsync(async (req, res, next) => {
  const { skip, limit } = req.query;
  const count = await FormModel.countDocuments({
    ...(req.user.role != "admin" && { user: req.user }),
  });
  const form = await FormModel.find({
    ...(req.user.role != "admin" && { user: req.user }),
  })
    .populate("user", { createdBy: "$name" })
    .limit(limit)
    .skip(skip);
  // .populate("user", "name") -- don't want to rename

  return res.status(201).json({
    status: "Success",
    message: "Retrived Form",
    data: form,
    count,
  });
});

exports.getAllFormEmployee = catchAsync(async (req, res) => {
  const { skip, limit } = req.query;
  const count = await FormModel.countDocuments({
    ...(req.user.role != "admin" && { user: req.user }),
  });
  const form = await FormModel.find({
    ...(req.user.role != "admin" && { user: req.user }),
  })
    .populate("user", { createdBy: "$name" })
    .limit(limit)
    .skip(skip);

    console.log(form)
  // .populate("user", "name") -- don't want to rename

  return res.status(201).json({
    status: "Success",
    message: "Retrived Form",
    data: form,
    count,
  });
});
