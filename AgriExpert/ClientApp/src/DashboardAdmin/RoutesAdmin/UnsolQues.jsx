import "../ComponentsAdmin/UnSolQues.css";
import SidebarAdmin from "../Sidebar/Sidebar";
import SearchBox from "./Search";
import Table from "../Table/Table";
import Services from '../../Shared/HttpRequests';
import { useState, useEffect } from 'react';
const UnsolvedQuestionscolumns = [
    { field: "id", headerName: "Question ID", width: 180 },
    {
        field: "questionContext",
        headerName: "Question Title",
        width: 200,
        editable: true
    },
    {
        field: "questionStatus",
        headerName: "Status",
        width: 180,
        editable: true
    },
    {
        field: "questionsTopicVariety",
        headerName: "Variety",
        width: 180,
        editable: true
    },
    {
        field: "questionTopicName",
        headerName: "Topic",
        width: 180,
        editable: true
    },
];

const UnSolved = () => {
    const [serverResponse, setserverResponse] = useState([]);
    const [isLoaded, setisLoaded] = useState(false);
    useEffect(() => {
        fetchResponse();
    }, []);
    const fetchResponse = async () => {
        let data = await Services.questionConfigurations.getAllQuestions();
        data = data.map(value => {
            if (value.questionStatus == "NotAnswered")
                return value;
        })
        var myIndex = data.indexOf(undefined);
        if (myIndex !== -1) {
            data.splice(myIndex, 1);
        }

        console.log(data)
        setserverResponse(data);
        setisLoaded(true);
    }
  return (
      isLoaded ?<div className="Dashboard">
      <div className="AppGlass">
        <SidebarAdmin />
              {/*<SearchBox />*/}
              <Table columns={UnsolvedQuestionscolumns} data={serverResponse} />
        <div></div>
      </div>
    </div>:<></>
  );
};

export default UnSolved;
