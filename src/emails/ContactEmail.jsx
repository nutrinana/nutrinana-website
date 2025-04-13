import { Html, Section, Container, Text } from '@react-email/components';


export default function QueryEmail({ name, title, comments, requestId, dateTime }) {
  return (
    <Html>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          body {
            font-family: 'Trebuchet MS', sans-serif;
          }
        `}</style>
      </head>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Hi there, {name}</Text>
          <Text style={paragraph}>Thank you for your enquiry. This is an automated response, but one of our team will aim to get back to you within 1-3 working days.</Text>
          <Text style={paragraph}>In the meantime, feel free to check out our FAQs at <a href="https://www.nutrinana.co.uk/FAQs" style={linkStyle}>
              www.nutrinana.co.uk/FAQs
            </a></Text>
          <br/>
          <Text style={paragraph}>Your Request:</Text>
          <Text style={email_heading}>{title}</Text>
          <Text style={detail}>{comments.replace(/\n/g, '<br/>')}</Text>
          <Text style={paragraph}>Enquiry ID:</Text>
          <Text style={detail}>{requestId}</Text>
          <Text style={paragraph}>Time of Request:</Text>
          <Text style={detail}>{dateTime}</Text>
        </Container>
      </Section>
    </Html>
  );
}

// Styles for the email template
const main = {
  backgroundColor: "#F7FDF2",
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
  color: "#191923", // raisin
  fontFamily: "'Trebuchet MS', sans-serif",
};
const email_heading = {
  fontSize: "1.25rem",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#191923", // raisin
  marginLeft: "20px",
  fontFamily: "'Trebuchet MS', sans-serif",
};

const paragraph = {
  fontSize: "1.0rem",
  lineHeight: "1.4",
  color: "#191923", // raisin
  fontFamily: "'Trebuchet MS', sans-serif",
};
const detail = {
  fontSize: "1.0rem",
  lineHeight: "1.4",
  color: "#191923", // raisin
  marginLeft: "20px",
  fontFamily: "'Trebuchet MS', sans-serif",
};
const linkStyle = {
  color: "#507153", // theme green
  textDecoration: "underline",
  fontFamily: "'Trebuchet MS', sans-serif",
};
