import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from 'dayjs';

//GET JOBS
export const getAllJobs = async (req, res) => {
  // const jobs = await Job.find({ createdBy: req.user.userId });
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};
//POST JOBS
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
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

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, crr) => {
    const { _id: title, count } = crr;
    acc[title] = count;
    return acc;
  }, {});
  console.log(stats);
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
  .map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;

    const date = day()
      .month(month - 1)
      .year(year)
      .format('MMM YY');
    return { date, count };
  })
  .reverse();

res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
