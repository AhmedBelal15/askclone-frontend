import HomePageNav from '../../Components/HomePageNav/HomePageNav.Component'
import AddQuestion from '../../Components/AddQuestion/AddQuestion.component'
import './home-page.style.css'

const HomePage = () => {

    return(
        <div className='home-page'>
            <HomePageNav />
            <AddQuestion />
        </div>
    );
}

export default HomePage