import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompleteChallenges } from '../components/CompleteChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengeContext';
import styles from '../styles/pages/Home.module.css';

interface HomeProps {
    level: number;
    currentExperience: number;
    challegesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
        level={props.level}
        currentExperience={props.currentExperience}
        challegesCompleted={props.challegesCompleted}
    >

        <div className={styles.container}>
        	<Head>
        		<title>Início | Move.it</title>
        	</Head>

          	<ExperienceBar />

            <CountdownProvider>
            	<section>
            		<div>
            			<Profile />
            			<CompleteChallenges />
            			<Countdown />
            		</div>

            		<div>
            			<ChallengeBox />
            		</div>
            	</section>
            </CountdownProvider>
        </div>
    </ChallengesProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { level, currentExperience, challegesCompleted } = ctx.req.cookies;

    return {
        props: {
            level: Number(level),
            currentExperience: Number(currentExperience),
            challegesCompleted: Number(challegesCompleted)
        }
    }
}