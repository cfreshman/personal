import React, { Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

export type InfoLabelType = (string | {text: string, func: () => any})
export type InfoEntryType = (string | {text: string, data: any})

export const InfoBadges = ({labels}: {
  labels: InfoLabelType[]
}) => {
  return labels.length ? <Fragment>
    <div className='badges'>
      {labels.filter(l => l).map((l, i) =>
        typeof l === 'string'
        ? <div className='label inline' key={i}>{l}</div>
        : <div className='button button-badge inline' onClick={l.func}key={i}>{l.text}</div>)}
    </div>
  </Fragment> : <Fragment></Fragment>
}

export const InfoLabel = ({labels}: {
  labels: InfoLabelType[]
}) => {
  return <Fragment>
    <div className='label inline'>{labels[0]}</div>
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
    <InfoLabel {...{ labels }} />
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

export const InfoItem = ({entry, labels, entryLabels}: {
  entry: InfoEntryType,
  labels?: InfoLabelType[],
  entryLabels?: InfoLabelType[],
}) => {
  return <InfoList {...{
    labels,
    entries: [entry],
    entryLabels: [entryLabels],
  }}/>
}

const _InfoLines = (props: {
  [key: string]: any,
  labels: InfoLabelType[],
  lines: any[],
  entryLabels?: InfoLabelType[][],
}) => {
  let {labels, lines, entryLabels} = props
  return <InfoSection labels={labels}>
    {lines.map((line, i) => <InfoLine key={i} labels={entryLabels && entryLabels[i]}>
      {line}
    </InfoLine>)}
  </InfoSection>
}

export const InfoList = ({entries, labels, entryLabels}: {
  entries: InfoEntryType[],
  labels?: InfoLabelType[],
  entryLabels?: InfoLabelType[][],
}) => {
  return <_InfoLines {...{
    labels, entryLabels, lines: entries.map((entry, i) =>
      <div className='entry'>
        {typeof entry === 'string' ? entry : entry.text}
      </div>)
  }} />
}
export const InfoLinks = ({entries, labels, entryLabels}: {
  entries: InfoEntryType[],
  labels?: InfoLabelType[],
  entryLabels?: InfoLabelType[][],
}) => {
  return <_InfoLines {...{
    labels, entryLabels, lines: entries.map((entry, i) =>
      <Link className='entry link'
          to={typeof entry === 'string' ? entry : entry.data}>
        {typeof entry === 'string' ? entry : entry.text}
      </Link>)
  }} />
}
export const InfoOutLinks = ({entries, labels, entryLabels}: {
  entries: InfoEntryType[],
  labels?: InfoLabelType[],
  entryLabels?: InfoLabelType[][],
}) => {
  return <_InfoLines {...{
    labels, entryLabels, lines: entries.map((entry, i) =>
      <a className='entry link'
          href={typeof entry === 'string' ? entry : entry.data}>
        {typeof entry === 'string' ? entry : entry.text}
      </a>)
  }} />
}
export const InfoFuncs = ({entries, entryFunc, labels, entryLabels}: {
  entries: InfoEntryType[],
  entryFunc: (entry: InfoEntryType) => any,
  labels?: InfoLabelType[],
  entryLabels?: InfoLabelType[][],
}) => {
  return <_InfoLines {...{
    labels, entryLabels, lines: entries.map((entry, i) =>
      <div className='entry link'
        onClick={() => entryFunc(typeof entry === 'string' ? entry : entry.data)}>
        {typeof entry === 'string' ? entry : entry.text}</div>)
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
export const InfoAutoSearch = ({searchRef, placeholder, term, search, go}: {
  searchRef: any, // Ref
  placeholder: string,
  term: string,
  search: () => any,
  go: () => any,
}) => {

  return <div className='search'>
    <input ref={searchRef} type='text' placeholder={placeholder}
        autoCorrect='off' autoCapitalize='off'
        value={term} onChange={search}
        onKeyDown={e => e.key === 'Enter' && go()}/>
    <span className='submit' onClick={go}>[ <span>go</span> ]</span>
  </div>
}

export const InfoBody = (props) => {
  return <div className='body'>{props.children}</div>
}

export const InfoStyles = styled.div`
height: 100%; width: 100%;
background: white;
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
    border: 2px solid white;
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
  }
  .entry {
    margin-right: .25rem;
    &.link, a {
      cursor: pointer;
      user-select: all;
      color: black;
      :hover { text-decoration: underline; }
    }
  }

  .button {
    display: inline-block;
    margin-left: .5rem;
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
  width: 66%;
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
    // border: 2px solid white;
    padding: 0 .3rem;
    border-radius: .3rem;
    margin-left: .3rem;
    white-space: pre;
    font-size: .9rem;
    &:hover span { text-decoration: underline; }
  }
}
`