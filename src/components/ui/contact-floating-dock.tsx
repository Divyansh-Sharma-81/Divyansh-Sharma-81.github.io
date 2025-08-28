/**
 * Contact Floating Dock - Social Media Links
 * Twitter(X), GitHub, LinkedIn, and Email
 */

import React from 'react';
import { FloatingDock } from './floating-dock';
import { 
  IconBrandTwitter, 
  IconBrandGithub, 
  IconBrandLinkedin, 
  IconMail 
} from '@tabler/icons-react';

const ContactFloatingDock: React.FC = () => {
  const socialLinks = [
    {
      title: "Email",
      icon: <IconMail className="h-full w-full" />,
      href: "mailto:divyansh.sharma2103@gmail.com",
    },
    {
      title: "LinkedIn", 
      icon: <IconBrandLinkedin className="h-full w-full" />,
      href: "https://linkedin.com/in/divyansh-sharma-81",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full" />,
      href: "https://github.com/Divyansh-Sharma-81",
    },
    {
      title: "Twitter",
      icon: <IconBrandTwitter className="h-full w-full" />,
      href: "https://twitter.com/divyansh_81",
    },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <FloatingDock
        items={socialLinks}
        desktopClassName="contact-floating-dock-desktop"
        mobileClassName="contact-floating-dock-mobile"
      />
    </div>
  );
};

export default ContactFloatingDock;