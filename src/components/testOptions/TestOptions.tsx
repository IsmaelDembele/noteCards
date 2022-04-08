import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getAllCards } from "../../apis/myApis";
import { useAppSelector } from "../../app/hooks";
import { testMenu } from "../../constantes/constantes";
import Testing from "../testing/Testing";
import "./testOptions.css";

const TestOption = () => {
  const id = useParams().id?.slice(1);
  const token = useAppSelector(state => state.auth.token) as string;
  // const { data, isSuccess } = useQuery(["everything", token], () => getAllCards(token));

  return (
    <section className="test-options">
      {id === testMenu.everything && <Testing />}
      {id === testMenu.topics && <div>topics</div>}
      {id === testMenu.subtopics && <div>subtopics</div>}
    </section>
  );
};

export default TestOption;
