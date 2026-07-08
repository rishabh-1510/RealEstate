import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

// npm install @react-email/components
//
// Usage with Resend (server-side only):
//
//   import { Resend } from "resend";
//   import InquiryEmail from "./InquiryEmail";
//
//   const resend = new Resend(process.env.RESEND_API_KEY);
//
//   await resend.emails.send({
//     from: "Inquiries <inquiries@yourdomain.com>",
//     to: ownerEmail,
//     replyTo: senderEmail,
//     subject: `New inquiry: ${propertyTitle}`,
//     react: (
//       <InquiryEmail
//         ownerName={ownerName}
//         propertyTitle={propertyTitle}
//         propertyPrice={propertyPrice}
//         senderName={senderName}
//         senderEmail={senderEmail}
//         senderPhone={senderPhone}
//         message={message}
//       />
//     ),
//   });

interface InquiryEmailProps {
  ownerName: string;
  propertyTitle: string;
  propertyPrice: number;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  message: string;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

export default function InquiryEmail({
  ownerName,
  propertyTitle,
  propertyPrice,
  senderName,
  senderEmail,
  senderPhone,
  message,
}: InquiryEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {senderName} is interested in {propertyTitle}
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.eyebrow}>New inquiry</Text>
            <Heading style={styles.title}>{propertyTitle}</Heading>
            <Text style={styles.price}>{formatPrice(propertyPrice)}</Text>
          </Section>

          <Section style={styles.body2}>
            <Text style={styles.greeting}>Hi {ownerName},</Text>
            <Text style={styles.paragraph}>
              <strong>{senderName}</strong> just sent an inquiry about this
              listing. Their details are below.
            </Text>

            <Section style={styles.detailsBox}>
              <Row label="Name" value={senderName} />
              <Row label="Email" value={senderEmail} />
              {senderPhone && <Row label="Phone" value={senderPhone} last />}
            </Section>

            <Text style={styles.messageLabel}>Message</Text>
            <Text style={styles.messageBox}>{message}</Text>

            <Link href={`mailto:${senderEmail}`} style={styles.replyButton}>
              Reply to {senderName}
            </Link>
          </Section>

          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            This inquiry was sent from your listing page. Replying will go
            directly to {senderEmail}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function Row({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <Section
      style={{
        ...styles.detailRow,
        borderBottom: last ? "none" : "1px solid #E4DFD3",
      }}
    >
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </Section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#F1EFE8",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: "24px 0",
  },
  container: {
    backgroundColor: "#FDFBF7",
    maxWidth: 480,
    margin: "0 auto",
    borderRadius: 14,
    overflow: "hidden",
    border: "1px solid #E4DFD3",
  },
  header: {
    backgroundColor: "#0F3057",
    padding: "24px 28px",
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#9FC1DE",
    margin: "0 0 6px",
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: "#FDFBF7",
    margin: "0 0 8px",
    lineHeight: 1.3,
  },
  price: {
    fontSize: 15,
    fontWeight: 600,
    color: "#D9B77C",
    margin: 0,
  },
  body2: {
    padding: "24px 28px 8px",
  },
  greeting: {
    fontSize: 15,
    color: "#16232C",
    margin: "0 0 8px",
  },
  paragraph: {
    fontSize: 14,
    color: "#3C4850",
    lineHeight: 1.6,
    margin: "0 0 18px",
  },
  detailsBox: {
    border: "1px solid #E4DFD3",
    borderRadius: 10,
    margin: "0 0 18px",
    overflow: "hidden",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 14px",
  },
  detailLabel: {
    fontSize: 12.5,
    color: "#5B6B74",
    margin: 0,
  },
  detailValue: {
    fontSize: 13.5,
    color: "#16232C",
    fontWeight: 500,
    margin: 0,
  },
  messageLabel: {
    fontSize: 12.5,
    color: "#5B6B74",
    margin: "0 0 6px",
  },
  messageBox: {
    fontSize: 14,
    color: "#16232C",
    lineHeight: 1.6,
    backgroundColor: "#F7F4EC",
    border: "1px solid #E4DFD3",
    borderRadius: 10,
    padding: "12px 14px",
    margin: "0 0 22px",
    whiteSpace: "pre-wrap",
  },
  replyButton: {
    display: "inline-block",
    backgroundColor: "#0F3057",
    color: "#FDFBF7",
    fontSize: 14,
    fontWeight: 500,
    padding: "11px 20px",
    borderRadius: 8,
    textDecoration: "none",
    marginBottom: 24,
  },
  hr: {
    borderColor: "#E4DFD3",
    margin: 0,
  },
  footer: {
    fontSize: 11.5,
    color: "#9AA6AC",
    padding: "16px 28px 22px",
    margin: 0,
    lineHeight: 1.5,
  },
};