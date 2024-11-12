import { makeRequestToDB } from "../../server.js";

export const subscribe = async (studentId, orderId) => {
    if (!studentId) return { success: false, msg: 'No studentId' };

    const student = await makeRequestToDB.student
        .findOne({ filter: { _id: { $oid: studentId } }});
    
    if (!student.document) return { success: false, msg: 'Student not found'};

    const subcription = await makeRequestToDB.subscription
        .insertOne({
            document: {
                student: { $oid: studentId },
                startDate: { $date: new Date(Date.now()).toISOString() },
                endDate: { $date: new Date(Date.now()+30).toISOString() },
                orderId,
            }
        });
    
    if(!subcription) return { success: false, msg: 'Error adding subscription'};
    return { success: true, msg: 'subscription added'};
};