import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request body
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { name, email, company, role, message } = validationResult.data;

    // Check for required environment variables
    const strapiUrl = process.env.STRAPI_API_URL;
    const strapiToken = process.env.STRAPI_API_TOKEN;

    if (!strapiUrl || !strapiToken) {
      console.error("Missing Strapi configuration:", {
        hasUrl: !!strapiUrl,
        hasToken: !!strapiToken,
      });
      return NextResponse.json(
        {
          success: false,
          error: "Server configuration error",
        },
        { status: 500 }
      );
    }

    // Format data for Strapi
    const strapiData = {
      data: {
        name,
        email,
        company,
        role,
        ...(message && { message }),
      },
    };

    // Send to Strapi
    const strapiResponse = await fetch(`${strapiUrl}/api/jaw-contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${strapiToken}`,
      },
      body: JSON.stringify(strapiData),
    });

    if (!strapiResponse.ok) {
      const errorText = await strapiResponse.text();
      console.error("Strapi API error:", {
        status: strapiResponse.status,
        statusText: strapiResponse.statusText,
        body: errorText,
      });
      return NextResponse.json(
        {
          success: false,
          error: "Failed to submit contact form",
        },
        { status: strapiResponse.status }
      );
    }

    const strapiResult = await strapiResponse.json();
    console.log("Contact form submitted successfully:", {
      id: strapiResult.data?.id,
      email,
    });

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
      data: strapiResult.data,
    });
  } catch (error) {
    console.error("Unexpected error in contact API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
