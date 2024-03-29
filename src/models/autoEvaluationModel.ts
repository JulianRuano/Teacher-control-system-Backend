import { Schema, model } from "mongoose";
import { AutoEvaluation as IAutoEvaluation } from "./interfaces/interfaces";
import { nanoid } from 'nanoid';


const AutoEvaluationSchema = new Schema<IAutoEvaluation>({
      _id: { type: String, default: () => nanoid()  },
    state:{
        type:String,
        required:true,
        default:"En ejecución",
        enum:["En ejecución","Terminado","Suspendido"]
    },
    puntuation:{
        type:Number,
        min:0,
        max:100
    },
    period:{
        name:{
            type:String,
            required:true
        },
        year:{
            type:String,
            required:true
        },
        semester:{
            type:Number,
            required:true
        },
        startDate:{
            type:Date,
            required:true
        },
        endDate:{
            type:Date,
            required:true
        }
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    evaluator:{
        type:String,
        ref:"Educator",
        required:true
    },
    evaluated:{
        type:String,
        ref:"Educator",
        required:true
    },
    results:{
        type:String,
    },
    suggestions:{
        type:String
    },
    act:{
        type:Boolean,
    },
    observation:{
        type:String,
    },
    labour:{
        type:String,
        ref:"Labour",
        required:true
    },
    evidencesLink:{
        type:String
    }
});

AutoEvaluationSchema.set('toJSON', {
  versionKey: false,
  transform: function (_doc, ret) {
    // remove these props when object is serialized
     ret.uid = ret._id;

  }
});

AutoEvaluationSchema.set('toObject', {
  transform: (_document, returnedObject) => {
    returnedObject.uid = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
export const AutoEvaluation = model("AutoEvaluation", AutoEvaluationSchema);
