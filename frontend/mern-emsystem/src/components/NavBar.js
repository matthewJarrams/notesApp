import {Link} from 'react-router-dom'

const NavBar = () => {
    return (
        <header>
            <div className='container'>
                <Link to='/'>
                    <h1>Code Ninjas Marda Loop Notes App (HomeGrown)</h1>
                </Link>
            </div>
        </header>
    )

}

export default NavBar