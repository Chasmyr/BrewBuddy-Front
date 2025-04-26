import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Box } from '@mui/material'

type SortableListProps<T> = {
  items: T[]
  onReorder: (newItems: T[]) => void
  renderItem: (item: T, index: number) => React.ReactNode
  getItemId: (item: T) => string
}

function DraggableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  }

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{ ...style, width: '100%' }}
    >
      {children}
    </Box>
  )
}

export function SortableList<T>({ items, onReorder, renderItem, getItemId }: SortableListProps<T>) {
  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => getItemId(item) === active.id)
      const newIndex = items.findIndex((item) => getItemId(item) === over.id)
      onReorder(arrayMove(items, oldIndex, newIndex))
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(getItemId)} strategy={verticalListSortingStrategy}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map((item, index) => (
            <DraggableItem key={getItemId(item)} id={getItemId(item)}>
              {renderItem(item, index)}
            </DraggableItem>
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  )
}
