import contact from "../models/contact.js";
import Contact from "../models/contact.js";


const registerContact = async (req, res) => {
  if (!req.body.name || !req.body.landline || !req.body.cellPhone)
    return res.status(400).send({ message: "Incomplete data" });

  const schema = new Contact({
    name: req.body.name,
    landline: req.body.landline,
    cellPhone: req.body.cellPhone,
    dbStatus: true,
  });

  const contact = await schema.save();
  return !contact
    ? res.status(500).send({ message: "Failed to register contact" })
    : res.status(200).send({ contact });
};


const listContact = async (req, res) => {
  const contacs = await Contact.find({
    name: new RegExp(req.params["name"]),
  });
  return contacs.length == 0
    ? res.status(400).send({ message: "Empty contac" })
    : res.status(200).send({ contacs });
};


const deleteContact = async (req, res) => {

  const contacts = await contact.findOneAndDelete({ name: req.params["name"] })

  return !contacts
    ? res.status(400).send({ message: "Contact no found" })
    : res.status(200).send({ message: "Contact deleted" });
};


//Buscar contacto existente por nombre en el body
const existingContact = async (req, res) => {
  if (!req.body.name)
    return res.status(400).send({ message: "Incomplete data" });

  let contacts = await contact.findOne({ name: req.body.name });

  return !contacts
    ? res.status(400).send({ message: "Contact no found" })
    : res.status(200).send({ contacts });
};


const directoryFull = async (req, res) => {

  const contacts = await Contact.count();

  if (contacts >= 10) {
    res.status(400).send({ message: "Contact book full" })
  } else {
    let counter = 10 - contacts;
    res.status(400).send({ message: "Can still register " + counter + " new contacts." })
  }

};



const updateContact = async (req, res) => {

  //Si no hay problema pasamos a realizar la actualizacion
  const existContact = await Contact.findOne({ name: req.body.name });

  if (!existContact) return res.status(500).send({ message: "Contact not found" });


  const editContact = await Contact.findByIdAndUpdate(existContact._id, {
    landline: req.body.landline,
    cellPhone: req.body.cellPhone,
  });

  if (!editContact) return res.status(500).send({ message: "Error editing contact" });

  return res.status(200).send({ message: "Contact updated" });

};


export default { registerContact, listContact, deleteContact, existingContact, directoryFull, updateContact };