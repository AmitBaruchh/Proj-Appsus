import { Icons } from '../cmps/Icons.jsx'

export function Home() {
    return (
        <section className="home">
            <h1 className='main-header'>Welcome to Appsus App!</h1>
            <p className='description'>
                Our app offers a solution by combining your emails and notes into one efficient platform.<br />
                Manage your inbox, get ideas and stay organized without juggling multiple apps.<br />
                With smart tools and real-time sync, it's the perfect place to stay connected and turn your thoughts into action without effort.
            </p>
            <Icons />

        </section>
    )
}
