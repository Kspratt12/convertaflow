export type TierId = "starter" | "growth" | "scale" | "system_upgrade";
export type UserRole = "owner" | "admin";
export type PlanStatus = "active" | "trial" | "past_due" | "canceled";

export interface BusinessProfile {
  id: string;
  user_id: string;
  business_name: string;
  business_email: string | null;
  phone: string | null;
  website_url: string | null;
  industry: string | null;
  plan_tier: TierId;
  plan_status: PlanStatus;
  plan_started_at: string | null;
  google_review_url: string | null;
  slug: string | null;
  role: UserRole;
  // Branding
  logo_url: string | null;
  brand_color: string;
  tagline: string | null;
  address: string | null;
  timezone: string;
  // Billing
  stripe_customer_id: string | null;
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  business_id: string;
  name: string;
  email: string;
  phone: string | null;
  source: string;
  status: "New" | "Contacted" | "Converted" | "Lost";
  message: string | null;
  assigned_to: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReviewRequest {
  id: string;
  business_id: string;
  customer_name: string;
  customer_email: string;
  status: "Sent" | "Opened" | "Completed";
  rating: number | null;
  review_url: string | null;
  sent_at: string;
  completed_at: string | null;
}

export interface EmailEvent {
  id: string;
  business_id: string;
  email_type: "lead_notification" | "review_request" | "follow_up" | "confirmation";
  recipient_email: string;
  subject: string;
  status: "Sent" | "Delivered" | "Opened" | "Clicked" | "Bounced";
  resend_id: string | null;
  created_at: string;
}

export interface SocialLink {
  id: string;
  business_id: string;
  platform: string;
  url: string;
  clicks: number;
  impressions: number;
  is_connected: boolean;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  business_id: string;
  action: string;
  target: string | null;
  type: "lead" | "review" | "email" | "social" | "system";
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  business_id: string | null;
  name: string;
  email: string;
  business_type: string | null;
  interest: string | null;
  message: string | null;
  created_at: string;
}

/** Session context passed through the dashboard */
export interface DashboardSession {
  user: {
    id: string;
    email: string;
  };
  profile: BusinessProfile;
}
