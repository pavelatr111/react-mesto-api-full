import React from 'react';
// import Date from 'core-js/core/date';

const date = new Date().getFullYear('2021')

function Footer(params) {
    return (
    <footer className="footer">
        <p className="footer__paragraph">&copy; {date} Mesto Russia</p>
    </footer>
    );
}

export default Footer;