import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";

//GET JOBS
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};
//POST JOBS
export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const job = await Job.create({ company, position });
  res.status(StatusCodes.CREATED).json(job);
};
//GET SINGLE JOB
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(200).json({ job });
};

//EDIT JOB
export const updateJob = async (req, res) => {
  const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updateJob) {
    return res.status(404).json({ msg: `no job with id ${req.params.id}` });
  }
  res.status(StatusCodes.OK).json({ msg: "job modified", updateJob });
};
//DELETE JOB
export const deleteJob = async (req, res) => {
  const removeJob = await Job.findByIdAndDelete(req.params.id);
  if (!removeJob) {
    return res.status(404).json({ msg: `no job with id ${req.params.id}` });
  }
  res.status(StatusCodes.OK).json({ json: removeJob });
};
