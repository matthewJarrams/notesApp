const mongoose = require("mongoose");

const { Schema } = mongoose;

const senseiSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            },
        password: {
            type: String,
            required: true,
            }
    },
  { timestamps: true }
);


const studentSchema = Schema(
  {
    StudentName: {
      type: String,
      required: true,
    },
    OldStudentID: {
      type: Number,
      required: true,
    },
    belt: {
      type: String,
      required: true
    },
    Curriculum: {
        type: String
    },
    BadgesCompleted: [{ type: Schema.Types.ObjectId, ref: "Badge" }],
    Points: {
        type: Number
    },
    Notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],


  },
  { timestamps: true }
);

const notesSchema = Schema(
  {
    studentID: {
        type: Schema.Types.ObjectId, 
        ref: 'Student',
        required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    game: {
      type: String,
      required: true,
    },
    senseiID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Sensei',
    },
    
  },
  { timestamps: true }
);

const beltsSchema = Schema(
  {
    Colour: {
      type: String,
      required: true,
    },
    Games: [{
      type: String,
    //   required: true,
    }],
  },
  { timestamps: true }
);

const badgesSchema = Schema(
    {
      BadgeName: {
        type: String,
        required: true,
      },
      Points: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true }
  );

const Sensei = mongoose.model("Sensei", senseiSchema);
const Student = mongoose.model("Student", studentSchema);
const Badge = mongoose.model("Badge", badgesSchema);
const Note = mongoose.model("Note", notesSchema);
const Belt = mongoose.model("Belt", beltsSchema);


module.exports = { Sensei, Student, Badge, Note,Belt };