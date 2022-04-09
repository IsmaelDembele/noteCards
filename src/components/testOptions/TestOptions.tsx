import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getAllCards, getAllCardsOfTopic } from "../../apis/myApis";
import { useAppSelector } from "../../app/hooks";
import { testMenu } from "../../constantes/constantes";
import Testing from "../testing/Testing";
import TestModal from "../testModal/TestModal";
import "./testOptions.css";

type TTestOption = {
  topic?: string;
};

const TestOption: React.FC<TTestOption> = ({ topic = ''}) => {
  const id = useParams().id?.slice(1);
  const token = useAppSelector(state => state.auth.token) as string;
  const { data, isSuccess } = useQuery(["everything", token], () => getAllCards(token));
  const { data: datatopic, isSuccess: isSuccessTopic } = useQuery(
    ["getbyTopic", token, topic],
    () => getAllCardsOfTopic(token, topic)
  );

  return (
    <section className="test-options">
      {id === testMenu.everything && <Testing data={data} isSuccess={isSuccess} />}

      {id === testMenu.topic && topic.length > 0 && datatopic && (
        <Testing data={datatopic} isSuccess={isSuccessTopic} />
      )}
      {id === testMenu.topic && topic.length === 0 && <TestModal title={testMenu.topic} />}

      {id === testMenu.subtopic && <div>subtopics</div>}
    </section>
  );
};

export default TestOption;
