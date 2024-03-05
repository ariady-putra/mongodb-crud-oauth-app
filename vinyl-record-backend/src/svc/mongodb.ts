import { env } from "process";

const dbURI = env.MONGODB ?? "mongodb://localhost:27017";
const dbOptions = {
  user: env.DB_USER,
  pass: env.DB_PASS,
  dbName: env.DB_NAME,
};

import mongoose from "mongoose";

mongoose
  .connect(dbURI, dbOptions)
  .then(() => console.log({ mongodb: dbURI }))
  .catch((error) => console.log({ error }));

type VinylRecord = {
  title: string;
  artist: string;
  year: number | undefined;
  genre: string | undefined;
  condition: string | undefined;
};

const vinylRecordSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
  },
  genre: {
    type: String,
  },
  condition: {
    type: String,
  },
});
const VinylRecord = mongoose.model("VinylRecord", vinylRecordSchema);

export const viewVinylRecords = async () => {
  try {
    const docs = await VinylRecord.find();
    return {
      status: 200,
      results: docs,
    };
  } catch (x) {
    throw {
      status: 500,
      message: "Server error",
      details: x,
    };
  }
};

export const findVinylRecord = async (id: string) => {
  try {
    const doc = await VinylRecord.findById(id);
    return doc
      ? {
          status: 200,
          result: doc,
        }
      : {
          status: 404,
          error: "Vinyl record not found",
        };
  } catch (x) {
    throw {
      status: 500,
      message: "Server error",
      details: x,
    };
  }
};

export const addVinylRecord = async (record: VinylRecord) => {
  try {
    const doc = await new VinylRecord(record).save();
    return {
      status: 201,
      message: "Vinyl record created successfully",
      details: doc,
    };
  } catch (x) {
    throw {
      status: 400,
      message: "Unable to create vinyl record",
      details: x,
    };
  }
};

export const editVinylRecord = async (id: string, record: VinylRecord) => {
  try {
    const doc = await VinylRecord.findByIdAndUpdate(id, record, { new: true });
    return doc
      ? {
          status: 200,
          message: "Vinyl record updated successfully",
          detail: doc,
        }
      : {
          status: 404,
          error: "Vinyl record not found",
        };
  } catch (x) {
    throw {
      status: 500,
      message: "Server error",
      details: x,
    };
  }
};

export const removeVinylRecord = async (id: string) => {
  try {
    const doc = await VinylRecord.findByIdAndDelete(id);
    return doc
      ? {
          status: 204,
          message: "Vinyl record deleted successfully",
          detail: doc,
        }
      : {
          status: 404,
          error: "Vinyl record not found",
        };
  } catch (x) {
    throw {
      status: 500,
      message: "Server error",
      details: x,
    };
  }
};
