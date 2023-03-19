


import { useState, useEffect } from 'react';
import { Card, Col, Container, Pagination, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ArtworkCard from '../components/ArtworkCard';
import validObjectIDList from '../public/data/validObjectIDList.json'
import { useAtom } from 'jotai'
import { favouritesAtom } from '../store.js'

const PER_PAGE = 12;

export default function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)

    if (favouritesList) {
        return (
            <>
                <Row className="gy-4">

                    {favouritesList.length > 0 ?

                        <>{favouritesList?.map(objID => (
                            <Col lg={3} key={objID}><ArtworkCard objectID={objID} /></Col>
                        ))}</>

                        :

                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    <h4>Nothing Here!</h4>Try searching for something else.
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    }

                </Row>

            
            </>
        )
    } else {
        return null;
    }
}




