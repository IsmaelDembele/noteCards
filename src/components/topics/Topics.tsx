import { LinearProgress } from "@mui/material";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { getTopics } from "../../apis/myApis";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { viewSubtopics } from "../../features/application/appSlice";
// import { IMyContext, myContext } from "../../context/myContext";
import "./topics.css";

export interface ITopics {
  _id?: string;
  name: string;
}

const Topics = () => {
  // const { dispatch } = useContext(myContext) as IMyContext;
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.auth);

  const { data, isError, isSuccess } = useQuery("getTopics", () => getTopics(), {
    onSuccess: data => {
      console.log(data?.data);
    },
  });

  if (isError) return <div>Error...</div>;

  return (
    <section className="topics">
      <div className="topics-title">Topics</div>
      {isError && <div>An error occured</div>}
      {isSuccess &&
        data?.data.map((el: ITopics, index: number) => {
          return (
            <div
              key={index}
              className="topics-items"
              onClick={() => {
                dispatch(viewSubtopics(el.name));
              }}
            >
              {el.name}
            </div>
          );
        })}
    </section>
  );
};

export default Topics;
