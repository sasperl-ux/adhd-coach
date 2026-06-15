import type { UserRole } from "@/lib/roles";

export type SessionActor = {
  id: string;
  role: UserRole;
};

export type Visibility = "PRIVATE" | "THERAPIST_SHARED" | "PARENT_SHARED";

export function requireRole(actor: SessionActor | null | undefined, allowed: UserRole[]) {
  if (!actor) {
    throw new Error("Authentication required.");
  }

  if (!allowed.includes(actor.role)) {
    throw new Error("Insufficient permissions.");
  }

  return actor;
}

export function teenProfileWhereForActor(actor: SessionActor) {
  if (actor.role === "ADMIN") {
    return {};
  }

  if (actor.role === "TEEN") {
    return {
      userId: actor.id
    };
  }

  if (actor.role === "THERAPIST") {
    return {
      therapistConnections: {
        some: {
          status: "ACTIVE",
          therapist: {
            userId: actor.id
          }
        }
      }
    };
  }

  return {
    parentAccessEnabled: true,
    parentConnections: {
      some: {
        status: "ACTIVE",
        approvedByTeen: true,
        parent: {
          userId: actor.id
        }
      }
    }
  };
}

export function teenScopedWhereForActor(actor: SessionActor) {
  return {
    teen: teenProfileWhereForActor(actor)
  };
}

export function visibilityWhereForActor(actor: SessionActor) {
  if (actor.role === "ADMIN" || actor.role === "TEEN") {
    return {};
  }

  if (actor.role === "THERAPIST") {
    return {
      visibility: {
        in: ["THERAPIST_SHARED", "PARENT_SHARED"] satisfies Visibility[]
      }
    };
  }

  return {
    visibility: "PARENT_SHARED" satisfies Visibility
  };
}

export function visibleTeenContentWhereForActor(actor: SessionActor) {
  return {
    ...teenScopedWhereForActor(actor),
    ...visibilityWhereForActor(actor)
  };
}

export function messagesWhereForActor(actor: SessionActor) {
  if (actor.role === "ADMIN") {
    return {};
  }

  return {
    AND: [
      teenScopedWhereForActor(actor),
      {
        OR: [
          { senderId: actor.id },
          { recipientId: actor.id }
        ]
      }
    ]
  };
}

export function checkInsWhereForActor(actor: SessionActor) {
  if (actor.role === "PARENT") {
    return {
      teen: {
        ...teenProfileWhereForActor(actor),
        parentConnections: {
          some: {
            status: "ACTIVE",
            approvedByTeen: true,
            accessLevel: "PARENT_SHARED",
            parent: {
              userId: actor.id
            }
          }
        }
      }
    };
  }

  return teenScopedWhereForActor(actor);
}

export function therapistNotesWhereForActor(actor: SessionActor) {
  if (actor.role === "ADMIN") {
    return {};
  }

  if (actor.role !== "THERAPIST") {
    return {
      id: "__never__"
    };
  }

  return {
    therapist: {
      userId: actor.id
    },
    teen: teenProfileWhereForActor(actor)
  };
}

export function assertCanCreateForTeen(actor: SessionActor, targetTeenUserId: string) {
  if (actor.role === "ADMIN" || actor.role === "THERAPIST") {
    return;
  }

  if (actor.role === "TEEN" && actor.id === targetTeenUserId) {
    return;
  }

  throw new Error("Only the teen, an assigned therapist, or an admin can create this resource.");
}
