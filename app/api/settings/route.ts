import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch current profile settings
export async function GET() {
  try {
    let settings = await prisma.profileSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.profileSettings.create({
        data: {
          id: "default",
          name: "Rakibul Islam",
          title: "Web Developer & Frontend Specialist",
          email: "rirakib03@gmail.com",
          phone: "+8801621-574994",
          location: "Pabna, Bangladesh",
          github: "https://github.com/Rakibul-Islam-1",
          linkedin: "https://linkedin.com/in/rakibul-islam",
          instagram: "https://instagram.com",
          profileImage: "/assets/Images/rakibulislam.jpg",
          aboutImage: "/assets/Images/rakibulislam.jpg",
          typewriterText: "Web Developer based in Bangladesh",
          aboutBio:
            "I am a Pabna, Bangladesh-based web developer with a focus on web development. I have a diverse range of experience having worked on various web applications.",
          experienceMonths: 6,
          clientsWorldwide: 25,
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PUT: Update profile settings
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      title,
      email,
      phone,
      location,
      github,
      linkedin,
      facebook,
      twitter,
      instagram,
      githubInContact,
      linkedinInContact,
      facebookInContact,
      twitterInContact,
      instagramInContact,
      githubInProfilesCard,
      linkedinInProfilesCard,
      facebookInProfilesCard,
      twitterInProfilesCard,
      instagramInProfilesCard,
      profileImage,
      aboutImage,
      typewriterText,
      aboutBio,
      experienceMonths,
      clientsWorldwide,
    } = body;

    const updatedSettings = await prisma.profileSettings.upsert({
      where: { id: "default" },
      update: {
        name,
        title,
        email,
        phone: phone || "+8801621-574994",
        location,
        github,
        linkedin,
        facebook: facebook ?? "",
        twitter: twitter ?? "",
        instagram: instagram ?? "",
        githubInContact: githubInContact ?? true,
        linkedinInContact: linkedinInContact ?? true,
        facebookInContact: facebookInContact ?? true,
        twitterInContact: twitterInContact ?? true,
        instagramInContact: instagramInContact ?? true,
        githubInProfilesCard: githubInProfilesCard ?? true,
        linkedinInProfilesCard: linkedinInProfilesCard ?? true,
        facebookInProfilesCard: facebookInProfilesCard ?? false,
        twitterInProfilesCard: twitterInProfilesCard ?? false,
        instagramInProfilesCard: instagramInProfilesCard ?? false,
        profileImage: profileImage || "/assets/Images/rakibulislam.jpg",
        aboutImage: aboutImage || "/assets/Images/rakibulislam.jpg",
        typewriterText: typewriterText || "Web Developer based in Bangladesh",
        aboutBio:
          aboutBio ||
          "I am a Pabna, Bangladesh-based web developer with a focus on web development. I have a diverse range of experience having worked on various web applications.",
        experienceMonths: Number(experienceMonths) || 6,
        clientsWorldwide: Number(clientsWorldwide) || 25,
      },
      create: {
        id: "default",
        name: name || "Rakibul Islam",
        title: title || "Web Developer & Frontend Specialist",
        email: email || "rirakib03@gmail.com",
        phone: phone || "+8801621-574994",
        location: location || "Pabna, Bangladesh",
        github: github || "https://github.com/Rakibul-Islam-1",
        linkedin: linkedin || "https://linkedin.com/in/rakibul-islam",
        facebook: facebook ?? "",
        twitter: twitter ?? "",
        instagram: instagram ?? "",
        githubInContact: githubInContact ?? true,
        linkedinInContact: linkedinInContact ?? true,
        facebookInContact: facebookInContact ?? true,
        twitterInContact: twitterInContact ?? true,
        instagramInContact: instagramInContact ?? true,
        githubInProfilesCard: githubInProfilesCard ?? true,
        linkedinInProfilesCard: linkedinInProfilesCard ?? true,
        facebookInProfilesCard: facebookInProfilesCard ?? false,
        twitterInProfilesCard: twitterInProfilesCard ?? false,
        instagramInProfilesCard: instagramInProfilesCard ?? false,
        profileImage: profileImage || "/assets/Images/rakibulislam.jpg",
        aboutImage: aboutImage || "/assets/Images/rakibulislam.jpg",
        typewriterText: typewriterText || "Web Developer based in Bangladesh",
        aboutBio:
          aboutBio ||
          "I am a Pabna, Bangladesh-based web developer with a focus on web development. I have a diverse range of experience having worked on various web applications.",
        experienceMonths: Number(experienceMonths) || 6,
        clientsWorldwide: Number(clientsWorldwide) || 25,
      },
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 }
    );
  }
}
