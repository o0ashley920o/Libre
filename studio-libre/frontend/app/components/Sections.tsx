'use client'
import {createDataAttribute, useOptimistic} from '@sanity/visual-editing/react'
import type {SanityDocument} from '@sanity/client'
// Minimal type definitions
type PageSection = {
  _key: string
  _type: string
}
type PageData = {
  _id: string
  _type: string
  sections?: PageSection[]
}
type SectionsProps = {
  documentId: string
  documentType: string
  sections?: PageSection[]
}
// Your Sanity configuration
const config = {
  projectId: 'b1v4qfsl',
  dataset: 'production',
  baseUrl: 'https://congenial-space-sniffle-9x96g9499qpf7v7-3000.app.github.dev
  ',
}
export function Sections({documentId, documentType, sections: initialSections}: SectionsProps) {
  const sections = useOptimistic<PageSection[] | undefined, SanityDocument<PageData>>(
    initialSections,
    (currentSections, action) => {
      if (action.id === documentId && action.document.sections) {
        return action.document.sections
      }
      return currentSections
    },
  )
  if (!sections?.length) {
    return null
  }
  return (
    <div
      data-sanity={createDataAttribute({
        ...config,
        id: documentId,
        type: documentType,
        path: 'sections',
      }).toString()}
    >
      {sections.map((section) => (
        <div
          key={section._key}
          data-sanity={createDataAttribute({
            ...config,
            id: documentId,
            type: documentType,
            path: `sections[_key=="${section._key}"]`,
          }).toString()}
        >
          {/* Render your section content here */}
          {section._type}
        </div>
      ))}
    </div>
  )
}