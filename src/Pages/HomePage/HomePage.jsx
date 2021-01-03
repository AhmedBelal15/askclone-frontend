import HomePageNav from '../../Components/HomePageNav/HomePageNav.Component'
import AddQuestion from '../../Components/AddQuestion/AddQuestion.component'
import AnswerModel from '../../Components/AnswerModel/AnswerModel.component'
import './home-page.style.css'

const HomePage = () => {

    return(
        <div className='home-page'>
            <HomePageNav />
            <AddQuestion />
            <div style={{height: '50px'}}></div>
            <AnswerModel />
        </div>
    );
}

export default HomePage