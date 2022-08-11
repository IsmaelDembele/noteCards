import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getAllCards, getAllCardsOfTopic, getCard } from "../../apis/myApis";
import { testMenu } from "../../utils/constantes/constantes";
import Testing from "../testing/Testing";
import TestModal from "../testModal/TestModal";
import "./testOptions.css";

type TTestOption = {
  topic?: string;
  subTopic?: string;
};

const TestOption: React.FC<TTestOption> = ({ topic = "", subTopic = "" }) => {
  const id = useParams().id?.slice(1);
  const { data, isSuccess } = useQuery(["everything"], () => getAllCards());
  const { data: datatopic, isSuccess: isSuccessTopic } = useQuery(["getbyTopic", topic], () =>
    getAllCardsOfTopic(topic)
  );
  const { data: dataSubtopic, isSuccess: isSuccessSubtopic } = useQuery(
    ["getCard", topic, subTopic],
    () => getCard(topic, subTopic)
  );

  return (
    <section className="test-options">
      {/* everything */}
      {id === testMenu.everything && <Testing data={data} isSuccess={isSuccess} />}

      {/* Topic */}
      {id === testMenu.topic && topic.length > 0 && datatopic && (
        <Testing data={datatopic} isSuccess={isSuccessTopic} />
      )}
      {id === testMenu.topic && topic.length === 0 && <TestModal title={testMenu.topic} />}

      {/* Subtopic */}
      {id === testMenu.subtopic && topic.length > 0 && subTopic.length > 0 && dataSubtopic && (
        <Testing data={dataSubtopic} isSuccess={isSuccessSubtopic} />
      )}
      {id === testMenu.subtopic && (topic.length === 0 || subTopic.length === 0) && (
        <TestModal title={testMenu.subtopic} />
      )}
    </section>
  );
};

export default TestOption;
