import {createDataAttribute} from '@sanity/visual-editing'
import {Sections} from '@/components/Sections'
// Your Sanity configuration
const config = {
  projectId: 'b1v4qfsl',
  dataset: 'production',
  baseUrl: 'https://congenial-space-sniffle-9x96g9499qpf7v7-3000.app.github.dev
  ',
}
export function SectionParent({documentId, documentType, sections}) {
  return (
    <div
      data-sanity={createDataAttribute({
        ...config,
        id: documentId,
        type: documentType,
        path: 'sections',
      }).toString()}
    >
      <Sections
        documentId={documentId}
        documentType={documentType}
        sections={sections}
      />
    </div>
  )
}