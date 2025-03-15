import Featured from '../../../components/Users/featured/Featured';
import FeaturedProperties from '../../../components/Users/featuredProperties/FeaturedProperties';
import Footer from '../../../components/Users/footer/Footer';
import Header from '../../../components/Users/header/Header';
import MailList from '../../../components/Users/mailList/MailList';
import Navbar from '../../../components/Users/navbar/Navbar';
import PropertyList from '../../../components/Users/propertyList/PropertyList';
import './home.css';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <div className='homeContainer'>
                <Featured />
                <h1 className='homeTitle'>Browse by property type</h1>
                <PropertyList />
                <h1 className='homeTitle'>Homes guests love</h1>
                <FeaturedProperties />
                <MailList />
                <Footer />
            </div>
        </div>
    );
};

export default Home;
