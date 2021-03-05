import React, { Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

export type InfoLabelType = (string | {text: string, func: () => any})
export type InfoEntryType = (string | {text: string, data: any})
export type InfoLineType = (any | {content: any, labels: InfoLabelType[]})

const _InfoBadge = ({label}: {label: InfoLabelType}) =>
  typeof label === 'string'
  ? <div className='label inline'>{label}</div>
  : <div className='button button-badge inline' onClick={label.func}>{label.text}</div>

export const InfoBadges = ({labels}: {
  labels: InfoLabelType[]
}) => {
  return labels.length ? <Fragment>
    <div className='badges'>
      {labels.filter(l => l).map((l, i) => <_InfoBadge key={i} label={l} />)}
    </div>
  </Fragment> : <Fragment></Fragment>
}

export const InfoLabel = ({labels}: {
  labels: InfoLabelType[]
}) => {
  let l0 = labels[0]
  return <Fragment>
    <_InfoBadge label={labels[0]} />
    <InfoBadges {...{ labels: labels.slice(1) }}/>
    <br/>
  </Fragment>
}

export const InfoUser = ({user, labels, userLabels}: {
  user: string,
  labels?: InfoLabelType[],
  userLabels?: InfoLabelType[],
}) => {
  let history = useHistory()
  labels = labels || ['user']
  userLabels = userLabels || []

  return <InfoLinks {...{
    labels,
    entries: [user],
    entryFunc: () => history.push(`/u/${user}`),
    entryLabels: [userLabels]
  }}/>
}

export const InfoSection = (props: {
  [key: string]: any,
  label?: InfoLabelType,
  labels?: InfoLabelType[],
}) => {
  let labels = props.label ? [props.label] : props.labels || []
  return <div {...props}>
    {labels ? <InfoLabel {...{ labels }} /> : ''}
    {props.children}
  </div>
}
export const InfoLine = (props: {
  [key: string]: any,
  labels?: InfoLabelType[],
}) => {
  let labels = props.label ? [props.label] : props.labels || []
  return <div className='entry-line' {...props}>
    {props.children}
    {labels
    ? <InfoBadges {...{ labels }} />
    : ''}
  </div>
}
export const InfoLines = (props: {
  [key: string]: any,
  labels?: InfoLabelType[],
  lines: InfoLineType[],
}) => {
  let {labels, lines} = props
  return <InfoSection labels={labels} {...props}>
    {lines.map((line, i) => (
      <InfoLine key={i} labels={line.labels}>
        {line.content || line}
      </InfoLine>
    ))}
  </InfoSection>
}

export const InfoList = ({entries, labels, entryLabels}: {
  entries: InfoEntryType[],
  labels?: InfoLabelType[],
  entryLabels?: InfoLabelType[][],
}) => {
  entryLabels = entryLabels || []
  return <InfoLines {...{
    labels, lines: entries.map((entry, i) => ({
      labels: entryLabels[i],
      content: (
      <div className='entry'>
        {typeof entry === 'string' ? entry : entry.text}
      </div>),
    }))
  }} />
}
export const InfoLinks = ({entries, labels, entryLabels}: {
  entries: InfoEntryType[],
  labels?: InfoLabelType[],
  entryLabels?: InfoLabelType[][],
}) => {
  entryLabels = entryLabels || []
  return <InfoLines {...{
    labels, lines: entries.map((entry, i) => ({
      labels: entryLabels[i],
      content: (
      <Link className='entry link' to={typeof entry === 'string' ? entry : entry.data}>
        {typeof entry === 'string' ? entry : entry.text}
      </Link>),
    }))
  }} />
}
export const InfoOutLinks = ({entries, labels, entryLabels}: {
  entries: InfoEntryType[],
  labels?: InfoLabelType[],
  entryLabels?: InfoLabelType[][],
}) => {
  entryLabels = entryLabels || []
  return <InfoLines {...{
    labels, lines: entries.map((entry, i) => ({
      labels: entryLabels[i],
      content: (
      <a className='entry link' href={typeof entry === 'string' ? entry : entry.data}>
        {typeof entry === 'string' ? entry : entry.text}
      </a>),
    }))
  }} />
}
export const InfoFuncs = ({entries, entryFunc, labels, entryLabels}: {
  entries: InfoEntryType[],
  entryFunc: (entry: InfoEntryType) => any,
  labels?: InfoLabelType[],
  entryLabels?: InfoLabelType[][],
}) => {
  entryLabels = entryLabels || []
  return <InfoLines {...{
    labels, lines: entries.map((entry, i) => ({
      labels: entryLabels[i],
      content: (
      <div className='entry link'
      onClick={() => entryFunc(typeof entry === 'string' ? entry : entry.data)}>
        {typeof entry === 'string' ? entry : entry.text}</div>),
    }))
  }} />
}

export const InfoSearch = ({searchRef, placeholder, search}: {
  searchRef: any, // Ref
  placeholder: string,
  search: () => any,
}) => {

  return <div className='search'>
    <input ref={searchRef} type='text' placeholder={placeholder}
      autoCorrect='off' autoCapitalize='off'
      onKeyDown={e => e.key === 'Enter' && search()}/>
    <span className='submit' onClick={search}>[ <span>go</span> ]</span>
  </div>
}
export const InfoAutoSearch = ({searchRef, placeholder, term, search, go, tab}: {
  searchRef: any, // Ref
  placeholder: string,
  term: string,
  search: () => any,
  go: () => any,
  tab?: (dir: number) => any,
}) => {

  return <div className='search'>
    <input ref={searchRef} type='text' placeholder={placeholder}
        autoCorrect='off' autoCapitalize='off'
        value={term} onChange={search}
        onKeyDown={e => {
          if (e.key === 'Enter') go()
          if (tab && e.key === 'Tab') {
            tab(e.shiftKey ? -1 : 1)
            e.preventDefault()
          }
        }}/>
    <span className='submit' onClick={go}>[ <span>go</span> ]</span>
  </div>
}

export const InfoBody = (props) => {
  return (
  <div {...props} className={`body ${props.className || ''}`}>
    {props.children}
  </div>)
}

let background = 'white'; //'rgb(251 250 247)'
export const InfoStyles = styled.div`
height: 100%; width: 100%;
background: ${background};
color: black;
display: flex; flex-direction: column;
.body {
  flex-grow: 1;
  overflow-y: scroll;
  padding: .8rem 1rem;

  .badges {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    > * {
      margin-left: .5rem;
    }
  }
  .label, .lil-badge, .button-badge {
    display: block;
    &.inline { display: inline-block; }
    width: fit-content;
    font-size: .8rem;
    padding: 0 .3rem;
    border-radius: .3rem;
  }
  .label, .lil-badge {
    opacity: .5;
    background: #00000022;
    // line up with button 2px border
    // border: 2px solid ${background};
    margin-top: 2px; margin-bottom: 2px;
    border-left: none;
    border-right: none;
  }
  .lil-badge {
    margin-left: .5rem;
  }

  > * {
    margin-bottom: .5rem;
    min-height: 3rem;
  }
  .entry-line {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    min-height: 0; // overrides 3rem above
  }
  .entry-line > *:not(.button), .entry {
    margin-right: .25rem;
    color: black;
    &.link, a {
      cursor: pointer;
      user-select: all;
      color: black;
      :hover { text-decoration: underline; }
    }
  }

  .button {
    display: inline-block;
    // margin-left: .5rem;
  }
}
.button {
  cursor: pointer; user-select: none;
  display: inline-block;
  width: fit-content;
  font-size: .8rem;
  border: 2px solid black;
  padding: 0 .3rem;
  border-radius: .3rem;
}
.edit-container {
  // width: 66%;
  width: 17.6rem;
  input {
    height: 2.0rem;
    line-height: 1rem;
  }
  input, textarea {
    width: 100%;
    color: black;
    border: 2px solid transparent;
    padding: 0 .5rem;
    border-color: #00000022;
    border-radius: .2rem;
    box-shadow: none;
    margin: .5rem 0;
    -webkit-appearance: none;
  }
  .button {
    float: right;
  }
}
.search {
  padding: .3rem .3rem;
  background: black;
  // background: #a2ddff;
  display: flex;
  input {
    width: 8rem;
    font-size: .8rem;
    background: white;
    border: white;
    color: black;
    padding: 0 .3rem;
    border-radius: .3rem;
    min-width: 42%;
  }
  .submit {
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: white;
    padding: 0 .3rem;
    border-radius: .3rem;
    margin-left: .3rem;
    white-space: pre;
    font-size: .9rem;
    &:hover span { text-decoration: underline; }
  }
}
`