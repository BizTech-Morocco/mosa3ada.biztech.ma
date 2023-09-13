'use client'
import Link from "next/link";
import Image from 'next/image'

import {
    Grid,
    Card,
    CardActions,
    CardContent,
    Typography
} from '@mui/material';

import { selectedIcon } from "../../utils";

export default function HelpCard({ help }) {
    const { date, needs, city, location, docId } = help;
    return (
        <Card sx={{
            minWidth: 350,
            minHeight: 230,
            margin: 2,
            display: "flex",
            flexDirection: "column"
        }}>
            <CardContent>
                <Grid style={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        { date && new Intl.DateTimeFormat('ar-MA', {month: "long", day: "numeric", year: "numeric"}).format(date) }
                    </Typography>
                    <Typography
                        sx={{ mb: 1.5 }}
                        color="text.secondary"
                        style={{
                            marginRight: "auto"
                        }}
                    >
                        الساعة { date && new Intl.DateTimeFormat('ar-MA', {hour:'2-digit', minute:'2-digit'}).format(date) }
                    </Typography>
                </Grid>
                <Grid container>
                    <Grid item xs={5} style={{
                        padding: 5,
                        flex: 1,
                        textAlign: "center",
                        alignContent: "center"
                    }}>
                        <Image
                            src="/position.svg"
                            alt="position"
                            width={20}
                            height={20}
                            priority
                        />
                        <Typography variant="h6">
                            {city}
                        </Typography>
                        <Typography variant="body1">
                            {location}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} style={{
                        padding: 5,
                        borderRight: "0.5px solid #ACACAC",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}>
                        {needs?.map((need, needInd) => (
                            <div key={needInd} style={{
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                <span style={{
                                    marginRight: 3,
                                    marginLeft: 3
                                }}>{selectedIcon(need)}</span>
                                <Typography variant="h5" key={needInd}>
                                    {need}
                                </Typography>
                            </div>
                        ))}
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions style={{
                marginTop: 'auto'
            }}>
                <Typography variant="body2">
                    {/* تأكيد 29 */}
                </Typography>
                <Link href={`/helps/${docId}`} style={{ marginRight: "auto", color: "#EE0000"}}> إقرأ المزيد </Link> 
            </CardActions>
        </Card>
    )
}