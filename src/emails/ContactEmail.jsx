import { Html, Section, Container, Text } from '@react-email/components';

/**
 * QueryEmail Component
 * This component generates an automated email response for contact form submissions.
 * It includes the user's name, request details, and additional information.
 * 
 * @param {object} props - The properties for the email.
 * @param {string} props.name - The name of the user.
 * @param {string} props.title - The title of the user's enquiry.
 * @param {string} props.comments - The comments provided by the user.
 * @param {string} props.requestId - The unique ID for the enquiry.
 * @param {string} props.dateTime - The date and time of the enquiry.
 * 
 * @returns {JSX.Element} - The rendered email component.
 */
export default function QueryEmail({ name, title, comments, requestId, dateTime }) {
  return (
    <Html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          body {
            font-family: 'Trebuchet MS', sans-sans-serif;
          }
        `}</style>
      </head>
      <Section style={main}>
        <Container style={container}>
          {/* Logo Section */}
          <div style={logoContainer}>
            <img
              src={`https://${process.env.STAGE === 'production' ? '' : 'staging.'}nutrinana.co.uk/nutrinana-logo.svg`}
              alt="Nutrinana Logo"
              style={logoStyle}
            />
          </div>

          {/* Greeting Section */}
          <Text style={heading}>Hi there, {name}</Text>
          <Text style={paragraph}>
            Thank you for your enquiry. This is an automated response from a no-reply email address, but one of our team will aim to get back to you within 1-3 working days.
          </Text>
          <Text style={paragraph}>
            In the meantime, feel free to check out our FAQs at <a href="https://www.nutrinana.co.uk/FAQs" style={linkStyle}>
              www.nutrinana.co.uk/FAQs
            </a>.
          </Text>
          <br/>

          {/* Request Details */}
          <Text style={paragraph}>Your Request:</Text>
          <Text style={heading_2}>{title}</Text>
          <Text style={detail}>{comments.replace(/\n/g, '<br/>')}</Text>
          <Text style={paragraph}>Enquiry ID:</Text>
          <Text style={detail}>{requestId}</Text>
          <Text style={paragraph}>Time of Request:</Text>
          <Text style={detail}>{dateTime}</Text>
          <br/>

          {/* Closing Section */}
          <Text style={heading}>Speak Soon!</Text>
        </Container>
      </Section>
    </Html>
  );
}

// Styles for the email template
const main = {
  backgroundColor: "#F7FDF2", // Light green background
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "100%",
  maxWidth: "580px",
};

const heading = {
  fontSize: "1.5rem",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#191923", // Raisin color
  fontFamily: "'Verdana', sans-serif",
};

const heading_2 = {
  fontSize: "1.25rem",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#191923", // Raisin color
  marginLeft: "20px",
  fontFamily: "'Verdana', sans-serif",
};

const paragraph = {
  fontSize: "1.0rem",
  lineHeight: "1.4",
  color: "#191923", // Raisin color
  fontFamily: "'Verdana', sans-serif",
};

const detail = {
  fontSize: "1.0rem",
  lineHeight: "1.4",
  color: "#191923", // Raisin color
  marginLeft: "20px",
  fontFamily: "'Verdana', sans-serif",
};

const linkStyle = {
  color: "#507153", // Theme green
  textDecoration: "underline",
  fontFamily: "'Verdana', sans-serif",
};

const logoContainer = {
  textAlign: "center",
  marginTop: "20px",
};

const logoStyle = {
  width: "150px", // Adjust the width as needed
  height: "auto",
};