import React from 'react';
import './Home.css';
import Images from "../../content/chart/Images";
import Charts from "../../content/chart/UserTimeEvaluation";
import TextCard from "../../common/card/TextCard";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import axios from 'axios';
import RateOfLabelledImages from '../chart/RateOfLabelledImages';


class Home extends React.Component{
state = {
    casesCount: '',
    casesSolvedCount: 0,
    backendResponse: false

};

    componentDidMount() {
        axios.get(`http://localhost:8081/api/folders_cases_and_labelled_images_count`)
          .then(response => {
            console.log(response.data, "ccjjjjjjkk");
            this.setState({
              casesCount: response.data.NoOfFolders,
              casesSolvedCount: response.data.NoOfLabelledImages,
              backendResponse: true
            })
          }).catch(error => console.log(error)
          )
      }

      
render(){
    const {casesCount, casesSolvedCount,backendResponse} = this.state;
    return(
      <div className="container-fluid">
      <div className="row">

      <div className="col-md-1"></div>
      <div className="col-md-5">
           <TextCard 
            color={'#CCCCFF'} 
            textColor={'#fff'} 
            fontSize={'20px'} 
            text={"Total number of folders"} 
            fontWeight={'bold'}
            count={backendResponse? casesCount: <Loader
              type="Oval"
              color="white"
              height={30}
              width={30}
              timeout={5000} 
           />}
            />
      </div>
      <div className="col-md-5">
       <TextCard 
           color={'#9874ca'} 
           textColor={'#fff'} 
           fontSize={'20px'} 
           text={"Number of images labelled"} 
           fontWeight={'bold'}
           count={backendResponse? casesSolvedCount: <Loader
            type="Oval"
            color="white"
            height={30}
            width={30}
            timeout={5000} 
   
         />}
            />
      </div>
      <div className="col-md-1"></div>
      </div>

      <div className="row">
      <div className="col-md-1"></div>

          <div className="col-md-5">
          {backendResponse ? <Charts />  : <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={30}
                width={30}
                timeout={5000}
                style ={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
       
             />}
          </div>

          <div className="col-md-5">
            {backendResponse ? <Images />  : <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={30}
                width={30}
                timeout={5000}
                style ={{position: "fixed", top: "50%", left: "50%", transform: "translate(-25%, -25%)"}}
             />}
             
          </div>

          <div className="col-md-1"></div>
       </div>
       <br></br>
       <br></br>

       <div className="row">
      <div className="col-md-1">
</div>

          <div className="col-md-10">
          {backendResponse ? <RateOfLabelledImages />  : <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={30}
                width={30}
                timeout={5000}
                style ={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
       
             />}
          </div>
          <div className="col-md-1"></div>
       </div>

  </div>
    );
}
}
export default Home;