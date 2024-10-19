import { LongTxt } from '../cmps/LongTxt.jsx'
import { Accordion } from '../cmps/Accordion.jsx'

const { Outlet, Link } = ReactRouterDOM

export function About() {
    return (
        <section className="about">
            <h1>About Page</h1>

            <LongTxt>
                <section>
                    <p>
                        <strong>Welcome to Appsus!</strong> Your all-in-one app designed to help you manage your daily
                        tasks efficiently. From organizing your notes and sending emails to managing your reading list,
                        Appsus provides a seamless experience to keep you on top of everything important.
                        <br />
                        <br />
                        With an easy-to-use interface and features tailored to productivity, we aim to make your digital
                        life more manageable, whether you’re at work, home, or on the go.
                    </p>
                </section>
            </LongTxt>

            <section>
                <Accordion title="Mail App">
                    The Mail App within Appsus allows you to manage your emails effectively. With features such as inbox
                    management, email composition, and categorization, it's designed to streamline your communication
                    needs. Whether you're sending out quick replies or organizing your inbox, the Mail App ensures you
                    stay on top of your conversations.
                </Accordion>

                <Accordion title="Notes App">
                    The Notes App is a powerful tool for capturing your ideas, thoughts, and to-do lists. Whether it's
                    simple text notes, task lists, or even multimedia notes with images or drawings, this app helps you
                    stay organized. The user-friendly interface allows you to pin important notes, search, filter, and
                    even customize the background colors of your notes.
                </Accordion>

                <Accordion title="Books App">
                    The Books App helps you track your reading habits and manage your library. You can view and filter
                    books by categories, add new ones to your collection, and even review and rate books you’ve read.
                    Whether you're keeping track of your reading progress or exploring new titles, the Books App ensures
                    you’re always connected to your favorite reads.
                </Accordion>

                <nav>
                    <Link className="team-link" to="/about/team">
                        Team
                    </Link>
                </nav>
                <Outlet />
            </section>
        </section>
    )
}
