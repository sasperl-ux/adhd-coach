import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ids = {
  therapistUser: "demo-user-therapist-ricci",
  therapistProfile: "demo-therapist-ricci",
  teenUser: "demo-user-teen-marta",
  teenProfile: "demo-teen-marta",
  parentUser: "demo-user-parent-anna",
  parentProfile: "demo-parent-anna",
  adminUser: "demo-user-admin",
  checkInMorning: "demo-checkin-marta-morning",
  checkInYesterday: "demo-checkin-marta-yesterday",
  goalStudy: "demo-goal-study",
  goalSleep: "demo-goal-sleep",
  routineBackpack: "demo-routine-backpack",
  routineStudy: "demo-routine-study",
  routineEvening: "demo-routine-evening",
  taskPhone: "demo-task-phone",
  taskDiary: "demo-task-diary",
  taskMovement: "demo-task-movement",
  reflection: "demo-reflection-private",
  therapistNote: "demo-therapist-note",
  invitationParent: "demo-invitation-parent",
  messageTherapist: "demo-message-therapist",
  messageTeen: "demo-message-teen",
  auditLog: "demo-audit-log-seed"
};

async function upsertUsers() {
  const therapist = await prisma.user.upsert({
    where: { email: "terapeuta.demo@adhd-coach.local" },
    update: {
      name: "Dott.ssa Ricci",
      role: "THERAPIST"
    },
    create: {
      id: ids.therapistUser,
      email: "terapeuta.demo@adhd-coach.local",
      name: "Dott.ssa Ricci",
      role: "THERAPIST",
      therapistProfile: {
        create: {
          id: ids.therapistProfile,
          licenseInfo: "Demo - non verificato",
          organization: "Studio Demo ADHD Coach",
          verifiedAt: new Date("2026-01-15T09:00:00.000Z")
        }
      }
    },
    include: { therapistProfile: true }
  });

  const teen = await prisma.user.upsert({
    where: { email: "marta.demo@adhd-coach.local" },
    update: {
      name: "Marta B.",
      role: "TEEN"
    },
    create: {
      id: ids.teenUser,
      email: "marta.demo@adhd-coach.local",
      name: "Marta B.",
      role: "TEEN",
      teenProfile: {
        create: {
          id: ids.teenProfile,
          dateOfBirth: new Date("2010-04-20T00:00:00.000Z"),
          consentStatus: "ACCEPTED",
          parentAccessEnabled: true,
          emergencyContactName: "Anna B.",
          emergencyContactPhone: "+39 333 000 0000"
        }
      }
    },
    include: { teenProfile: true }
  });

  const parent = await prisma.user.upsert({
    where: { email: "genitore.demo@adhd-coach.local" },
    update: {
      name: "Anna B.",
      role: "PARENT"
    },
    create: {
      id: ids.parentUser,
      email: "genitore.demo@adhd-coach.local",
      name: "Anna B.",
      role: "PARENT",
      parentProfile: {
        create: {
          id: ids.parentProfile
        }
      }
    },
    include: { parentProfile: true }
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin.demo@adhd-coach.local" },
    update: {
      name: "Admin Demo",
      role: "ADMIN"
    },
    create: {
      id: ids.adminUser,
      email: "admin.demo@adhd-coach.local",
      name: "Admin Demo",
      role: "ADMIN"
    }
  });

  const therapistProfile = await prisma.therapistProfile.upsert({
    where: { userId: therapist.id },
    update: {
      licenseInfo: "Demo - non verificato",
      organization: "Studio Demo ADHD Coach",
      verifiedAt: new Date("2026-01-15T09:00:00.000Z")
    },
    create: {
      id: ids.therapistProfile,
      userId: therapist.id,
      licenseInfo: "Demo - non verificato",
      organization: "Studio Demo ADHD Coach",
      verifiedAt: new Date("2026-01-15T09:00:00.000Z")
    }
  });

  const teenProfile = await prisma.teenProfile.upsert({
    where: { userId: teen.id },
    update: {
      dateOfBirth: new Date("2010-04-20T00:00:00.000Z"),
      consentStatus: "ACCEPTED",
      parentAccessEnabled: true,
      emergencyContactName: "Anna B.",
      emergencyContactPhone: "+39 333 000 0000"
    },
    create: {
      id: ids.teenProfile,
      userId: teen.id,
      dateOfBirth: new Date("2010-04-20T00:00:00.000Z"),
      consentStatus: "ACCEPTED",
      parentAccessEnabled: true,
      emergencyContactName: "Anna B.",
      emergencyContactPhone: "+39 333 000 0000"
    }
  });

  const parentProfile = await prisma.parentProfile.upsert({
    where: { userId: parent.id },
    update: {},
    create: {
      id: ids.parentProfile,
      userId: parent.id
    }
  });

  return {
    therapist,
    teen,
    parent,
    admin,
    therapistProfile,
    teenProfile,
    parentProfile
  };
}

async function seedConnections({ therapistProfile, teenProfile, parentProfile }) {
  await prisma.therapistTeenConnection.upsert({
    where: {
      therapistId_teenId: {
        therapistId: therapistProfile.id,
        teenId: teenProfile.id
      }
    },
    update: { status: "ACTIVE" },
    create: {
      therapistId: therapistProfile.id,
      teenId: teenProfile.id,
      status: "ACTIVE"
    }
  });

  await prisma.teenParentConnection.upsert({
    where: {
      teenId_parentId: {
        teenId: teenProfile.id,
        parentId: parentProfile.id
      }
    },
    update: {
      status: "ACTIVE",
      accessLevel: "PARENT_SHARED",
      approvedByTeen: true,
      approvedByTherapist: true
    },
    create: {
      teenId: teenProfile.id,
      parentId: parentProfile.id,
      status: "ACTIVE",
      accessLevel: "PARENT_SHARED",
      approvedByTeen: true,
      approvedByTherapist: true
    }
  });
}

async function seedTeenData({ therapist, teen, teenProfile }) {
  await prisma.checkIn.upsert({
    where: { id: ids.checkInMorning },
    update: {
      moodScore: 7,
      energyScore: 6,
      focusScore: 5,
      stressScore: 4,
      sleepHours: 7.5,
      notes: "Mattina abbastanza stabile. Meglio partire con un solo compito."
    },
    create: {
      id: ids.checkInMorning,
      teenId: teenProfile.id,
      moodScore: 7,
      energyScore: 6,
      focusScore: 5,
      stressScore: 4,
      sleepHours: 7.5,
      notes: "Mattina abbastanza stabile. Meglio partire con un solo compito.",
      createdAt: new Date("2026-06-05T06:12:00.000Z")
    }
  });

  await prisma.checkIn.upsert({
    where: { id: ids.checkInYesterday },
    update: {
      moodScore: 6,
      energyScore: 5,
      focusScore: 6,
      stressScore: 5,
      sleepHours: 6.75
    },
    create: {
      id: ids.checkInYesterday,
      teenId: teenProfile.id,
      moodScore: 6,
      energyScore: 5,
      focusScore: 6,
      stressScore: 5,
      sleepHours: 6.75,
      createdAt: new Date("2026-06-04T18:40:00.000Z")
    }
  });

  await prisma.goal.upsert({
    where: { id: ids.goalStudy },
    update: {
      title: "Studiare con blocchi brevi",
      status: "ACTIVE",
      visibility: "THERAPIST_SHARED"
    },
    create: {
      id: ids.goalStudy,
      teenId: teenProfile.id,
      createdById: therapist.id,
      title: "Studiare con blocchi brevi",
      description: "Usare blocchi da 20 minuti con pausa breve e obiettivo visibile.",
      status: "ACTIVE",
      visibility: "THERAPIST_SHARED",
      dueDate: new Date("2026-06-20T00:00:00.000Z")
    }
  });

  await prisma.goal.upsert({
    where: { id: ids.goalSleep },
    update: {
      title: "Routine serale piu prevedibile",
      status: "ACTIVE",
      visibility: "PARENT_SHARED"
    },
    create: {
      id: ids.goalSleep,
      teenId: teenProfile.id,
      createdById: therapist.id,
      title: "Routine serale piu prevedibile",
      description: "Ridurre passaggi ambigui prima di dormire.",
      status: "ACTIVE",
      visibility: "PARENT_SHARED",
      dueDate: new Date("2026-06-27T00:00:00.000Z")
    }
  });

  const routines = [
    {
      id: ids.routineBackpack,
      title: "Preparare lo zaino",
      description: "Checklist rapida prima di uscire.",
      frequency: "Ogni giorno di scuola",
      timeOfDay: "07:30",
      createdById: teen.id,
      visibility: "PARENT_SHARED"
    },
    {
      id: ids.routineStudy,
      title: "Blocco studio da 20 minuti",
      description: "Timer breve, telefono lontano, un solo esercizio.",
      frequency: "Lunedi-Venerdi",
      timeOfDay: "16:15",
      createdById: therapist.id,
      visibility: "THERAPIST_SHARED"
    },
    {
      id: ids.routineEvening,
      title: "Check serale leggero",
      description: "Guardare la lista di domani senza completarla ora.",
      frequency: "Ogni sera",
      timeOfDay: "21:00",
      createdById: teen.id,
      visibility: "PRIVATE"
    }
  ];

  for (const routine of routines) {
    await prisma.routine.upsert({
      where: { id: routine.id },
      update: {
        title: routine.title,
        description: routine.description,
        frequency: routine.frequency,
        timeOfDay: routine.timeOfDay,
        visibility: routine.visibility
      },
      create: {
        ...routine,
        teenId: teenProfile.id,
        status: "ACTIVE"
      }
    });
  }

  const tasks = [
    {
      id: ids.taskPhone,
      routineId: ids.routineStudy,
      goalId: ids.goalStudy,
      title: "Mettere il telefono fuori dalla scrivania",
      status: "DONE",
      completedAt: new Date("2026-06-05T14:05:00.000Z")
    },
    {
      id: ids.taskDiary,
      routineId: ids.routineStudy,
      goalId: ids.goalStudy,
      title: "Aprire il diario e scrivere la prima riga",
      status: "TODO",
      completedAt: null
    },
    {
      id: ids.taskMovement,
      routineId: null,
      goalId: null,
      title: "Fare una pausa movimento di 5 minuti",
      status: "TODO",
      completedAt: null
    }
  ];

  for (const task of tasks) {
    await prisma.task.upsert({
      where: { id: task.id },
      update: {
        title: task.title,
        status: task.status,
        completedAt: task.completedAt
      },
      create: {
        id: task.id,
        teenId: teenProfile.id,
        routineId: task.routineId,
        goalId: task.goalId,
        title: task.title,
        status: task.status,
        dueDate: new Date("2026-06-05T21:00:00.000Z"),
        completedAt: task.completedAt
      }
    });
  }

  await prisma.reflection.upsert({
    where: { id: ids.reflection },
    update: {
      content: "Mi aiuta quando il primo passo e gia pronto sul tavolo.",
      visibility: "PRIVATE"
    },
    create: {
      id: ids.reflection,
      teenId: teenProfile.id,
      prompt: "Quale dettaglio ha reso piu facile iniziare?",
      content: "Mi aiuta quando il primo passo e gia pronto sul tavolo.",
      visibility: "PRIVATE"
    }
  });
}

async function seedProfessionalData({ therapist, teen, teenProfile }) {
  await prisma.therapistNote.upsert({
    where: { id: ids.therapistNote },
    update: {
      content: "Nota demo privata del terapeuta. Non visibile ad adolescente o genitore."
    },
    create: {
      id: ids.therapistNote,
      therapistId: ids.therapistProfile,
      teenId: teenProfile.id,
      content: "Nota demo privata del terapeuta. Non visibile ad adolescente o genitore."
    }
  });

  await prisma.message.upsert({
    where: { id: ids.messageTherapist },
    update: {
      body: "Ho aggiunto una routine breve per il pomeriggio. Provala solo se oggi hai energia sufficiente."
    },
    create: {
      id: ids.messageTherapist,
      teenId: teenProfile.id,
      senderId: therapist.id,
      recipientId: teen.id,
      body: "Ho aggiunto una routine breve per il pomeriggio. Provala solo se oggi hai energia sufficiente.",
      createdAt: new Date("2026-06-05T07:10:00.000Z")
    }
  });

  await prisma.message.upsert({
    where: { id: ids.messageTeen },
    update: {
      body: "Il blocco da 20 minuti ieri e andato meglio del previsto."
    },
    create: {
      id: ids.messageTeen,
      teenId: teenProfile.id,
      senderId: teen.id,
      recipientId: therapist.id,
      body: "Il blocco da 20 minuti ieri e andato meglio del previsto.",
      createdAt: new Date("2026-06-04T17:15:00.000Z"),
      readAt: new Date("2026-06-05T07:00:00.000Z")
    }
  });
}

async function seedOperationalData({ therapist }) {
  await prisma.invitation.upsert({
    where: { tokenHash: "demo-parent-invite-token-hash" },
    update: {
      email: "genitore.demo@adhd-coach.local",
      role: "PARENT",
      expiresAt: new Date("2026-07-05T00:00:00.000Z")
    },
    create: {
      id: ids.invitationParent,
      email: "genitore.demo@adhd-coach.local",
      role: "PARENT",
      invitedById: therapist.id,
      teenId: ids.teenProfile,
      tokenHash: "demo-parent-invite-token-hash",
      expiresAt: new Date("2026-07-05T00:00:00.000Z"),
      acceptedAt: new Date("2026-06-01T10:00:00.000Z")
    }
  });

  await prisma.auditLog.upsert({
    where: { id: ids.auditLog },
    update: {
      action: "SEED_DEMO_DATA",
      metadata: { source: "prisma/seed.mjs" }
    },
    create: {
      id: ids.auditLog,
      actorId: therapist.id,
      action: "SEED_DEMO_DATA",
      targetType: "DATABASE",
      targetId: "demo",
      metadata: { source: "prisma/seed.mjs" }
    }
  });
}

async function main() {
  const users = await upsertUsers();

  if (!users.therapistProfile || !users.teenProfile || !users.parentProfile) {
    throw new Error("Demo profiles were not created correctly.");
  }

  await seedConnections(users);
  await seedTeenData(users);
  await seedProfessionalData(users);
  await seedOperationalData(users);
}

main()
  .then(async () => {
    console.log("Seed completed: demo therapist, teen, parent, routines, tasks, check-ins and messages created.");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
