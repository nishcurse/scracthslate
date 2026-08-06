# Deletable Boards Dashboard implementation plan

## Source
- Superdesign project: `a740e995-0433-4763-93b2-2ef63a789de9`
- Draft: `fd00fb8e-5dc6-4f59-a655-9dfc9752a01b`
- Draft title: `ScratchSlate — Deletable Boards Dashboard`

## Design reference
The draft HTML was retrieved from the Superdesign CLI and used as the structural and visual reference for the implementation. The resulting UI follows the same brutalist system as the existing landing page:
- paper / ink / acid palette
- 3px borders and offset shadows
- Archivo Black headlines and Space Mono labels
- sticky header with avatar and logout action
- top hero section with title, search input, and new board CTA
- responsive board grid with delete actions and animated removal
- empty state when no boards remain

## Component structure
- `components/dashboard/DeletableBoardsDashboard.tsx`
  - Composes the full page shell, hero area, board grid, and footer
- `components/dashboard/DashboardHeader.tsx`
  - Sticky top nav with ScratchSlate branding, avatar, and logout button
- `components/dashboard/BoardList.tsx`
  - Responsive board grid with optional removal animation state
- `components/dashboard/BoardCard.tsx`
  - Individual board card including preview art, title, actions, and delete button
- `components/dashboard/EmptyState.tsx`
  - Empty state used when the board list is cleared
- `components/dashboard/types.ts`
  - Board and user types
- `hooks/useBoards.ts`
  - Local dummy board state and delete behavior for now

## Notes
- The current implementation uses local dummy data only and does not depend on the backend yet.
- Deletion uses a short 200ms fade/scale animation to match the Superdesign behaviour.
- A modal triggered by the "New Board" button allows creating a new board (title input + Create board) matching the Superdesign style; newly created boards are prepended to the list as dummy data.
- The page is mounted at `/dashboard` in the Next.js app router.
