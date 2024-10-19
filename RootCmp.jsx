const { Route, Routes, Navigate } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { BookIndex } from './apps/book/pages/BookIndex.jsx'
import { NotFound } from './cmps/NotFound.jsx'
import { NoteEdit } from './apps/note/cmps/NoteEdit.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { Team } from './cmps/Team.jsx'

export function App() {
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />}>
                            <Route path="/about/team" element={<Team />} />
                        </Route>
                        <Route path="/mail" element={<MailIndex />} />
                        <Route path="/book" element={<BookIndex />} />

                        <Route path="/note" element={<NoteIndex />}>
                            <Route path="edit/:noteId" element={<NoteEdit />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
}
