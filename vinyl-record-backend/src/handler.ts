import { Request, Response } from "express";
import * as svc from "./svc/_";

export const getAllVinylRecords = async (req: Request, rsp: Response) =>
  svc.mongodb
    .viewVinylRecords()
    .then((resp) => rsp.status(resp.status).json(resp))
    .catch((error) => _respondError(rsp, error));

export const getVinylRecordByID = async (req: Request, rsp: Response) =>
  svc.mongodb
    .findVinylRecord(req.params.id)
    .then((resp) => rsp.status(resp.status).json(resp))
    .catch((error) => _respondError(rsp, error));

export const postVinylRecord = async (req: Request, rsp: Response) =>
  svc.mongodb
    .addVinylRecord(req.body)
    .then((resp) => rsp.status(resp.status).json(resp))
    .catch((error) => _respondError(rsp, error));

export const putVinylRecordByID = async (req: Request, rsp: Response) =>
  svc.mongodb
    .editVinylRecord(req.params.id, req.body)
    .then((resp) => rsp.status(resp.status).json(resp))
    .catch((error) => _respondError(rsp, error));

export const deleteVinylRecordByID = async (req: Request, rsp: Response) =>
  svc.mongodb
    .removeVinylRecord(req.params.id)
    .then((resp) => rsp.status(resp.status).json(resp))
    .catch((error) => _respondError(rsp, error));

function _respondError(resp: Response, error: any) {
  resp.status(error.status ?? 500);

  const body = {
    status: resp.statusCode,
    error: error.message,
    details: error.details,
    at: new Date(),
  };
  console.log(body);
  resp.json(body);
}
