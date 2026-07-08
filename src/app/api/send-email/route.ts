import { resend } from "@/src/lib/resend";
import { NextRequest, NextResponse } from "next/server";
import InquiryEmail from "@/src/components/emails/InquiryEmail";
interface SendEmailBody {
    ownerEmail: string;
    ownerName: string;
    propertyTitle: string;
    propertyPrice: number;
    senderEmail: string;
    senderName: string;
    message: string;
    senderPhone?: string;
}
export async function POST(req: NextRequest) {
    try {
        const body: SendEmailBody = await req.json();
        const { ownerEmail, ownerName, propertyTitle, propertyPrice, senderEmail, senderName, message, senderPhone } = body;
        if (!ownerEmail || !senderEmail || !senderName || !message) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }
        //send the email
        await resend.emails.send({
            from: process.env.EMAIL_FROM!,
            subject: `Property Inquiry from ${senderName}`,
            react:InquiryEmail({
                senderEmail,
                senderName,
                senderPhone,
                ownerName,
                propertyPrice,
                propertyTitle,
                message
            }),
            to:"belwalrishabh5@gmail.com"

        });
        return NextResponse.json({success:true})
} catch (error) {
    console.log(error);
    return NextResponse.json(
        {
            error: "Failed to send email"
        },
        {
            status: 500,
        }
    );
}
}