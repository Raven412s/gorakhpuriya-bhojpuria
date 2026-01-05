import mongoose, { Schema, model, Model } from "mongoose";

export interface UploadedAsset {
  public_id?: string;
  secure_url?: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

export interface EventDocument {
  title: string;
  date: string;
  venue: string;
  city?: string;
  type?: "jutan" | "baithaki" | string;
  motive?: string;
  description: string[];
  media: UploadedAsset[];
  attendees?: string[];
  totalPhotos?: number;
  learnings?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UploadedAssetSchema = new Schema<UploadedAsset>(
  {
    public_id: String,
    secure_url: String,
    width: Number,
    height: Number,
    format: String,
    bytes: Number,
  },
  { _id: false }
);

const EventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    venue: { type: String, required: true },
    city: { type: String },
    type: { type: String },
    motive: { type: String },
    description: { type: [String], required: true },
    media: { type: [UploadedAssetSchema], default: [] },
    attendees: { type: [String], default: [] },
    totalPhotos: { type: Number, default: 0 },
    learnings: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Event: Model<EventDocument> = mongoose.models.Event || model("Event", EventSchema);
export default Event;
