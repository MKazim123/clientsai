import React from 'react';
import './index.css';
import headerImage from "./assets/header.png"; // Import the CSS file (you can place the CSS styles here)
// Define the type for the props
interface FooterProps {
    isFooterVisible: boolean;
}

const Footer: React.FC<FooterProps> = ({isFooterVisible}) => {
    const handleSmsClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (navigator.userAgent.match('like Mac OS X')) {
            e.preventDefault();
            window.location.href = e.currentTarget.href.replace('?', '&');
        }
    };

    return (
        <div id="container02" className="style3 container default">
            <div className="wrapper">
                <div className="inner">
                    <p id="text01"
                       className={`style2 ${isFooterVisible ? 'footer-fade-in visible' : 'footer-fade-in'}`}>
                    <span className="p">
                        The next time you hear someone talking about AI in marketing, think of Clients.ai.<br/>
                        <em>Can You Think Of A Friend Who Would Like To Close More Deals?</em><br/>
                        <strong>Spread The Love:</strong>
                    </span>
                    </p>
                    <div id="embed02" className="embed02">
                        <style></style>
                        <div className="share-buttons"><a
                            href="sms:?&amp;body=Hey,%20check%20out%20this%20new%20marketing%20software.%20it%20recreates%20new%20marketing%20for%20each%20lead%20in%20real%20time,%20and%20I%20thought%20of%20you!%20I%20just%20took%20their%20quiz%20and%20got%20mind-blowing%20personal%20insights.%20Try%20it%20out%20and%20see%20if%20their%20AI%20can%20make%20you%20some%20money!%20https%3A%2F%2FClients.ai"
                            onClick={handleSmsClick}
                            target="_blank" rel="noopener noreferrer" className="share-button"
                            style={{backgroundColor: '#25D366'}}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path
                                    d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                        </a><a
                            href="https://www.facebook.com/sharer.php?u=https%3A%2F%2FClients.ai&amp;quote=Hey,%20check%20out%20this%20new%20marketing%20software.%20it%20recreates%20new%20marketing%20for%20each%20lead%20in%20real%20time,%20and%20I%20thought%20of%20you!%20I%20just%20took%20their%20quiz%20and%20got%20mind-blowing%20personal%20insights.%20Try%20it%20out%20and%20see%20if%20their%20AI%20can%20make%20you%20some%20money!"
                            target="_blank" rel="noopener noreferrer" className="share-button"
                            style={{backgroundColor: '#1877F2'}}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a><a
                            href="https://www.linkedin.com/shareArticle?url=https%3A%2F%2FClients.ai&amp;title=ClientsAI%20-%20Personalized%20Marketing%20Strategy&amp;summary=Hey,%20check%20out%20this%20new%20marketing%20software.%20it%20recreates%20new%20marketing%20for%20each%20lead%20in%20real%20time,%20and%20I%20thought%20of%20you!%20I%20just%20took%20their%20quiz%20and%20got%20mind-blowing%20personal%20insights.%20Try%20it%20out%20and%20see%20if%20their%20AI%20can%20make%20you%20some%20money!"
                            target="_blank" rel="noopener noreferrer" className="share-button"
                            style={{backgroundColor: '#0A66C2'}}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path
                                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a><a
                            href="https://twitter.com/intent/tweet?url=https%3A%2F%2FClients.ai&amp;text=Hey,%20check%20out%20this%20new%20marketing%20software.%20it%20recreates%20new%20marketing%20for%20each%20lead%20in%20real%20time,%20and%20I%20thought%20of%20you!%20I%20just%20took%20their%20quiz%20and%20got%20mind-blowing%20personal%20insights.%20Try%20it%20out%20and%20see%20if%20their%20AI%20can%20make%20you%20some%20money!"
                            target="_blank" rel="noopener noreferrer" className="share-button"
                            style={{backgroundColor: '#000000'}}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="currentColor">
                                <path
                                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </svg>
                        </a></div>
                    </div>
                    <div id="image03" className="image">
                        <span className="frame">
                            <img src={headerImage} alt="Header"/>
                        </span>
                    </div>
                    <p id="text07" className="style1">© 2025 ClientsAI</p></div>
            </div>
        </div>
    );
};

export default Footer;
