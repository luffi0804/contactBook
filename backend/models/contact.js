import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  landline: String,
  cellPhone: String,
  dbStatus: Boolean,
});

const contact = mongoose.model("contact", contactSchema);
export default contact;