const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function onToggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    if (isMenuOpen) {
        document.body.style.paddingTop = '240px'
    } else {
        document.body.style.paddingTop = '100px'
    }

    return (
        <header className={`app-header ${isMenuOpen ? 'menu-open' : ''}`}>
            <Link to="/">
                <h3>Appsus!</h3>
            </Link>
            <nav className={`main-nav ${isMenuOpen ? 'menu-open' : ''}`}>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
            </nav>
            <button className="btn-toggle-menu" onClick={onToggleMenu}>
                <div className="hamburger-lines">
                    <span className="line line1"></span>
                    <span className="line line2"></span>
                    <span className="line line3"></span>
                </div>
            </button>
        </header>
    )
}
