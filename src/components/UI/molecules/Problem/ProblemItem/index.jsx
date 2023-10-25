import React from 'react'
import ProblemNumber from '../../../atoms/ProblemAttributes/ProblemNumber'
import ProblemAcceptance from '../../../atoms/ProblemAttributes/ProblemAcceptance'
import ProblemDifficulty from '../../../atoms/ProblemAttributes/ProblemDifficulty'
import ProblemStatus from '../../../atoms/ProblemAttributes/ProblemStatus'
import ProblemTitle from '../../../atoms/ProblemAttributes/ProblemTitle'


export default function index({problem}) {
  return (
    <div>
        <ProblemNumber number={problem.number} />
        <ProblemStatus status={problem.status}/>
        <ProblemTitle title={problem.title}/>
        <ProblemAcceptance acceptance={problem.acceptance}/>
        <ProblemDifficulty difficulty={problem.difficulty}/>
    </div>
  )
}
