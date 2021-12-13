const FactionOverview = () => (
    <div className='mt-3'>
        <div className='content'>
            <h1 className='title'>Faction Oversight Guild</h1>
            <p>
                The Faction Oversight Guild was created to help factions, organizations to just generally be better. Your faction pays us to help legislate law and protect their members and we then ensure the faction from failing.
            </p>
            <p>
                We provide a model for all factions to follow, the renown model. As your reputation increases so will your rank, this way you can track your progress and if you do not receive something you are entitled to you can come to us and we will fight your case for you.
            </p>
            <p>
                Your faction will provide jobs for your to pick up and complete and on successful completion of a job you will be rewarded large amounts renown. Some jobs offer rewards from the patron where as others offer no such reward.
            </p>
            <p>
                The following is your renown or how many jobs you will need to have taken to progress through the ranks, it is up to your faction to decide what each rank’s responsibilities are ant what rewards you receive but the format is the same for each rank.
            </p>
            <table className='table is-narrow is-stripped'>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Benefit</th>
                        <th>Renown</th>
                        <th>Jobs</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Rank D
                        </td>
                        <td>
                            Nothing
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            0
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Rank C
                        </td>
                        <td>
                            Faction skill
                        </td>
                        <td>
                            3
                        </td>
                        <td>
                            1
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Rank B
                        </td>
                        <td>
                            +1 ability point, can't go above 20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            2
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Rank A
                        </td>
                        <td>
                            A unique magic item that reflects the Faction's beliefs
                        </td>
                        <td>
                            50
                        </td>
                        <td>
                            3
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Rank S
                        </td>
                        <td>
                            A unique feat that reflects the Faction's beliefs
                        </td>
                        <td>
                            100
                        </td>
                        <td>
                            4
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

    </div>
)

export default FactionOverview