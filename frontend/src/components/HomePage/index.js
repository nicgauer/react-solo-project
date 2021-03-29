import { useSelector } from 'react-redux';

const HomePage = () => {
    const user = useSelector((state) => state.session.user);

    return (
        <div>
            {user && (
                <div>
                    <h2>{user.username}</h2>
                    <img src={user.pictureURL} />
                </div>
            )}
        </div>
    )
}

export default HomePage;